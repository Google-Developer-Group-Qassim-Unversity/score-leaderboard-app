import fs from "fs"
import path from "path"
import os from "os"
import crypto from "crypto"
import { execSync } from "child_process"
import AdmZip from "adm-zip"
import forge from "node-forge"
import { WalletCardData, WALLET_THEMES, DEFAULT_THEME_ID } from "./wallet-themes"

function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "")
  const bigint = parseInt(cleanHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgb(${r}, ${g}, ${b})`
}

function getOpenSSLCommand(): string | null {
  if (process.platform === "win32") {
    const gitOpenSSL = "C:\\Program Files\\Git\\usr\\bin\\openssl.exe"
    if (fs.existsSync(gitOpenSSL)) {
      return `"${gitOpenSSL}"`
    }
  }
  try {
    execSync("openssl version", { stdio: "ignore" })
    return "openssl"
  } catch {
    return null
  }
}

/**
 * Pure JavaScript PKCS#7 detached signer using node-forge
 * Works in Serverless (Vercel, AWS Lambda, Cloudflare) without OpenSSL binary
 */
function signManifestWithForge(
  manifestBuffer: Buffer,
  p12Buffer: Buffer,
  p12Password: string,
  wwdrBuffer: Buffer
): Buffer {
  // Parse PKCS#12 (.p12) certificate & private key
  const p12Der = p12Buffer.toString("binary")
  const p12Asn1 = forge.asn1.fromDer(p12Der)
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, p12Password)

  let signerCert: forge.pki.Certificate | null = null
  let signerKey: forge.pki.PrivateKey | null = null

  for (const sc of p12.safeContents) {
    for (const sb of sc.safeBags) {
      if (sb.cert && !signerCert) {
        signerCert = sb.cert
      }
      if (sb.key && !signerKey) {
        signerKey = sb.key
      }
    }
  }

  if (!signerCert || !signerKey) {
    throw new Error("Could not extract certificate and private key from .p12 file")
  }

  // Parse Apple WWDR certificate
  let wwdrCert: forge.pki.Certificate
  try {
    const wwdrDer = wwdrBuffer.toString("binary")
    wwdrCert = forge.pki.certificateFromAsn1(forge.asn1.fromDer(wwdrDer))
  } catch {
    // If PEM format
    wwdrCert = forge.pki.certificateFromPem(wwdrBuffer.toString("utf8"))
  }

  // Create PKCS#7 SignedData
  const p7 = forge.pkcs7.createSignedData()
  p7.content = forge.util.createBuffer(manifestBuffer.toString("utf8"), "utf8")

  p7.addCertificate(signerCert)
  p7.addCertificate(wwdrCert)

  p7.addSigner({
    key: signerKey,
    certificate: signerCert,
    digestAlgorithm: forge.pki.oids.sha1,
    authenticatedAttributes: [
      {
        type: forge.pki.oids.contentType,
        value: forge.pki.oids.data,
      },
      {
        type: forge.pki.oids.signingTime,
        value: new Date(),
      },
      {
        type: forge.pki.oids.messageDigest,
      },
    ],
  })

  // Detached signature
  p7.sign({ detached: true })

  const asn1 = p7.toAsn1()
  const der = forge.asn1.toDer(asn1).getBytes()
  return Buffer.from(der, "binary")
}

export async function generateSignedPkpassBuffer(cardData: WalletCardData): Promise<Buffer> {
  const tmpId = `pass-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  // IMPORTANT: Use os.tmpdir() for writable temp directory in Vercel / Serverless (/tmp)
  const tempDir = path.join(os.tmpdir(), tmpId)
  fs.mkdirSync(tempDir, { recursive: true })

  try {
    const passModelDir = path.join(process.cwd(), "passmodels", "gdg.pass")
    const certsDir = path.join(process.cwd(), "certificates")

    // 1. Resolve Certificate Buffers (from Infisical env vars or local certificates/ folder)
    let p12Buffer: Buffer | null = null
    let wwdrBuffer: Buffer | null = null
    const p12Password = process.env.APPLE_P12_PASSWORD || "2shb+RY3692VMLkKO6vWWfl2"

    if (process.env.APPLE_P12_BASE64) {
      p12Buffer = Buffer.from(process.env.APPLE_P12_BASE64, "base64")
    } else {
      const localP12 = path.join(certsDir, "apple-wallet-pass-certificate.p12")
      if (fs.existsSync(localP12)) {
        p12Buffer = fs.readFileSync(localP12)
      }
    }

    if (process.env.APPLE_WWDR_BASE64) {
      wwdrBuffer = Buffer.from(process.env.APPLE_WWDR_BASE64, "base64")
    } else {
      const localWwdr = path.join(certsDir, "AppleWWDRCAG4.cer")
      const localWwdrPem = path.join(certsDir, "wwdr.pem")
      if (fs.existsSync(localWwdr)) {
        wwdrBuffer = fs.readFileSync(localWwdr)
      } else if (fs.existsSync(localWwdrPem)) {
        wwdrBuffer = fs.readFileSync(localWwdrPem)
      }
    }

    // 2. Copy image assets
    const filesToHash = [
      "icon.png",
      "icon@2x.png",
      "icon@3x.png",
      "logo.png",
      "logo@2x.png",
      "logo@3x.png",
      "strip.png",
      "strip@2x.png",
      "strip@3x.png",
    ]

    for (const f of filesToHash) {
      const srcPath = path.join(passModelDir, f)
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(tempDir, f))
      }
    }

    // 3. Select Theme Colors
    const theme = WALLET_THEMES[cardData.themeId] || WALLET_THEMES[DEFAULT_THEME_ID]
    const passTypeId = process.env.APPLE_PASS_TYPE_ID || "pass.pass.com.gdg-q.wallet"
    const teamId = process.env.APPLE_TEAM_ID || "7NN7W24VXR"

    const serialNumber = cardData.uuid
      ? `GDGQ-${cardData.uuid.slice(0, 8).toUpperCase()}`
      : `GDGQ-${Date.now().toString().slice(-6)}`

    const qrTargetUrl = cardData.uuid
      ? `https://gdg-q.com/wallet/${cardData.uuid}`
      : "https://gdg-q.com"

    const majorValue =
      cardData.major ||
      (cardData.educationLevel === "highschool" ? "المرحلة الثانوية" : "علوم حاسب")

    const institutionValue =
      cardData.institution ||
      (cardData.educationLevel === "highschool" ? "مدرسة ثانوية" : "جامعة القصيم")

    const levelValue =
      cardData.studyYearOrLevel ||
      (cardData.userStatus === "graduate" ? "خريج معتمد" : "عضو مجتمع GDG")

    // 4. Build pass.json
    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: passTypeId,
      teamIdentifier: teamId,
      organizationName: "GDG Qassim",
      serialNumber: serialNumber,
      description: theme.roleTitle || "بطاقة عضوية مجتمع المطورين GDG Qassim",
      logoText: "GDG QASSIM",
      foregroundColor: "rgb(255, 255, 255)",
      backgroundColor: hexToRgb(theme.badgeColor || theme.swatchHex || "#2563eb"),
      labelColor: "rgb(226, 232, 240)",
      generic: {
        headerFields: [
          {
            key: "role",
            label: "الصفة",
            value: theme.isAdmin ? "إداري النادي" : "عضو النادي",
          },
        ],
        primaryFields: [
          {
            key: "name",
            label: "الاسم",
            value: cardData.fullName || "عضو GDG",
          },
        ],
        secondaryFields: [
          {
            key: "major",
            label: "التخصص",
            value: majorValue,
          },
          {
            key: "institution",
            label: "الصرح التعليمي",
            value: institutionValue,
          },
        ],
        auxiliaryFields: [
          {
            key: "level",
            label: "المستوى / المرحلة",
            value: levelValue,
          },
          {
            key: "phone",
            label: "الجوال",
            value: cardData.phone
              ? `${cardData.countryCode || "+966"} ${cardData.phone}`
              : "+966",
          },
        ],
        backFields: [
          {
            key: "email",
            label: "البريد الإلكتروني",
            value: cardData.email || "",
          },
          {
            key: "status",
            label: "حالة العضوية",
            value: cardData.userStatus === "graduate" ? "خريج" : "طالب مسجل",
          },
          {
            key: "about",
            label: "عن النادي",
            value: "Google Developer Groups - Qassim",
          },
          {
            key: "website",
            label: "الموقع الإلكتروني",
            value: "https://gdg-q.com",
          },
        ],
      },
      barcodes: [
        {
          format: "PKBarcodeFormatQR",
          message: qrTargetUrl,
          messageEncoding: "iso-8859-1",
          altText: serialNumber,
        },
      ],
    }

    const passJsonPath = path.join(tempDir, "pass.json")
    fs.writeFileSync(passJsonPath, JSON.stringify(passJson, null, 2))

    // 5. Generate manifest.json (SHA-1 checksums)
    const manifest: { [key: string]: string } = {}
    const tempFiles = fs.readdirSync(tempDir)
    for (const f of tempFiles) {
      if (f.endsWith(".pem") || f.endsWith(".p12") || f.endsWith(".cer") || f === "signature") continue
      const filePath = path.join(tempDir, f)
      const data = fs.readFileSync(filePath)
      manifest[f] = crypto.createHash("sha1").update(data).digest("hex")
    }

    const manifestPath = path.join(tempDir, "manifest.json")
    const manifestBuffer = Buffer.from(JSON.stringify(manifest, null, 2))
    fs.writeFileSync(manifestPath, manifestBuffer)

    // 6. Sign manifest (Pure JS with node-forge or OpenSSL fallback)
    const signaturePath = path.join(tempDir, "signature")
    let signatureBuffer: Buffer | null = null

    // Method A: Pure JS Forge Signer (Serverless-friendly, 0 external binaries)
    if (p12Buffer && wwdrBuffer) {
      try {
        signatureBuffer = signManifestWithForge(manifestBuffer, p12Buffer, p12Password, wwdrBuffer)
        fs.writeFileSync(signaturePath, signatureBuffer)
      } catch (forgeErr) {
        console.warn("Forge signing failed, trying OpenSSL fallback:", forgeErr)
      }
    }

    // Method B: OpenSSL CLI fallback
    if (!signatureBuffer) {
      const opensslCmd = getOpenSSLCommand()
      if (!opensslCmd) {
        throw new Error("No certificate signer available (OpenSSL not found and .p12 missing)")
      }

      let signerCertPath = path.join(certsDir, "signerCert.pem")
      let signerKeyPath = path.join(certsDir, "signerKey.pem")
      let wwdrCertPath = path.join(certsDir, "wwdr.pem")

      if (!fs.existsSync(signerCertPath) && p12Buffer) {
        const tempP12Path = path.join(tempDir, "temp-cert.p12")
        fs.writeFileSync(tempP12Path, p12Buffer)
        signerCertPath = path.join(tempDir, "signerCert.pem")
        signerKeyPath = path.join(tempDir, "signerKey.pem")
        execSync(
          `${opensslCmd} pkcs12 -in "${tempP12Path}" -clcerts -nokeys -out "${signerCertPath}" -passin pass:${p12Password}`
        )
        execSync(
          `${opensslCmd} pkcs12 -in "${tempP12Path}" -nocerts -nodes -out "${signerKeyPath}" -passin pass:${p12Password}`
        )
      }

      if (!fs.existsSync(wwdrCertPath) && wwdrBuffer) {
        const tempWwdrPath = path.join(tempDir, "wwdr.cer")
        fs.writeFileSync(tempWwdrPath, wwdrBuffer)
        wwdrCertPath = path.join(tempDir, "wwdr.pem")
        execSync(`${opensslCmd} x509 -inform DER -in "${tempWwdrPath}" -out "${wwdrCertPath}"`)
      }

      const signCommand = `${opensslCmd} smime -sign -signer "${signerCertPath}" -inkey "${signerKeyPath}" -certfile "${wwdrCertPath}" -in "${manifestPath}" -out "${signaturePath}" -outform DER -binary -nodetach`
      execSync(signCommand)
    }

    // 7. Zip into .pkpass Buffer
    const zip = new AdmZip()
    const finalFiles = fs.readdirSync(tempDir)
    for (const f of finalFiles) {
      if (f.endsWith(".pem") || f.endsWith(".p12") || f.endsWith(".cer")) continue
      zip.addLocalFile(path.join(tempDir, f))
    }

    return zip.toBuffer()
  } finally {
    // Cleanup temporary directory
    try {
      fs.rmSync(tempDir, { recursive: true, force: true })
    } catch {
      // ignore
    }
  }
}
