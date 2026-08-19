import fs from "fs"
import path from "path"
import crypto from "crypto"
import { execSync } from "child_process"
import AdmZip from "adm-zip"
import { WalletCardData, WALLET_THEMES, DEFAULT_THEME_ID } from "./wallet-themes"

function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "")
  const bigint = parseInt(cleanHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgb(${r}, ${g}, ${b})`
}

function getOpenSSLCommand(): string {
  if (process.platform === "win32") {
    const gitOpenSSL = "C:\\Program Files\\Git\\usr\\bin\\openssl.exe"
    if (fs.existsSync(gitOpenSSL)) {
      return `"${gitOpenSSL}"`
    }
  }
  return "openssl"
}

export async function generateSignedPkpassBuffer(cardData: WalletCardData): Promise<Buffer> {
  const tmpId = `pass-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  const tempDir = path.join(process.cwd(), "tmp", tmpId)
  fs.mkdirSync(tempDir, { recursive: true })

  try {
    const passModelDir = path.join(process.cwd(), "passmodels", "gdg.pass")
    const certsDir = path.join(process.cwd(), "certificates")
    const opensslCmd = getOpenSSLCommand()

    // 1. Setup signer certs (from Infisical env vars or local certificates/ folder)
    let signerCertPath = path.join(certsDir, "signerCert.pem")
    let signerKeyPath = path.join(certsDir, "signerKey.pem")
    let wwdrCertPath = path.join(certsDir, "wwdr.pem")

    // If PEM files are missing locally, extract from Infisical APPLE_P12_BASE64
    if (!fs.existsSync(signerCertPath) || !fs.existsSync(signerKeyPath)) {
      const p12Base64 = process.env.APPLE_P12_BASE64
      const p12Password = process.env.APPLE_P12_PASSWORD || "2shb+RY3692VMLkKO6vWWfl2"
      const wwdrBase64 = process.env.APPLE_WWDR_BASE64

      if (p12Base64) {
        const tempP12Path = path.join(tempDir, "temp-cert.p12")
        fs.writeFileSync(tempP12Path, Buffer.from(p12Base64, "base64"))

        signerCertPath = path.join(tempDir, "signerCert.pem")
        signerKeyPath = path.join(tempDir, "signerKey.pem")

        execSync(
          `${opensslCmd} pkcs12 -in "${tempP12Path}" -clcerts -nokeys -out "${signerCertPath}" -passin pass:${p12Password}`
        )
        execSync(
          `${opensslCmd} pkcs12 -in "${tempP12Path}" -nocerts -nodes -out "${signerKeyPath}" -passin pass:${p12Password}`
        )
      }

      if (wwdrBase64 && !fs.existsSync(wwdrCertPath)) {
        const tempWwdrCerPath = path.join(tempDir, "wwdr.cer")
        fs.writeFileSync(tempWwdrCerPath, Buffer.from(wwdrBase64, "base64"))
        wwdrCertPath = path.join(tempDir, "wwdr.pem")
        execSync(`${opensslCmd} x509 -inform DER -in "${tempWwdrCerPath}" -out "${wwdrCertPath}"`)
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
    const backgroundColor = hexToRgb(theme.bgHex)
    const foregroundColor = hexToRgb(theme.textColor)
    const labelColor = hexToRgb(theme.labelColor)

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
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    // 6. Sign with OpenSSL
    const signaturePath = path.join(tempDir, "signature")
    const signCommand = `${opensslCmd} smime -sign -signer "${signerCertPath}" -inkey "${signerKeyPath}" -certfile "${wwdrCertPath}" -in "${manifestPath}" -out "${signaturePath}" -outform DER -binary -nodetach`
    execSync(signCommand)

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
