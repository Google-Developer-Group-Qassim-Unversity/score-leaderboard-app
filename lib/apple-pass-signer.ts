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

    // 1. Copy image assets
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

    // 2. Select Theme Colors
    const theme = WALLET_THEMES[cardData.themeId] || WALLET_THEMES[DEFAULT_THEME_ID]
    const backgroundColor = hexToRgb(theme.bgHex)
    const foregroundColor = hexToRgb(theme.textColor)
    const labelColor = hexToRgb(theme.labelColor)

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

    // 3. Build pass.json
    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: "pass.pass.com.gdg-q.wallet",
      teamIdentifier: "7NN7W24VXR",
      organizationName: "GDG Qassim",
      serialNumber: serialNumber,
      description: "بطاقة عضوية مجتمع المطورين GDG Qassim",
      logoText: "GDG QASSIM",
      foregroundColor: foregroundColor,
      backgroundColor: backgroundColor,
      labelColor: labelColor,
      generic: {
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

    // 4. Generate manifest.json (SHA-1 checksums)
    const manifest: { [key: string]: string } = {}
    const tempFiles = fs.readdirSync(tempDir)
    for (const f of tempFiles) {
      const filePath = path.join(tempDir, f)
      const data = fs.readFileSync(filePath)
      manifest[f] = crypto.createHash("sha1").update(data).digest("hex")
    }

    const manifestPath = path.join(tempDir, "manifest.json")
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    // 5. Sign with Apple Developer certificate and WWDR G4 intermediate cert
    const signaturePath = path.join(tempDir, "signature")
    const signerCert = path.join(certsDir, "signerCert.pem")
    const signerKey = path.join(certsDir, "signerKey.pem")
    const wwdrCert = path.join(certsDir, "wwdr.pem")

    const opensslCmd = getOpenSSLCommand()
    const signCommand = `${opensslCmd} smime -sign -signer "${signerCert}" -inkey "${signerKey}" -certfile "${wwdrCert}" -in "${manifestPath}" -out "${signaturePath}" -outform DER -binary -nodetach`
    execSync(signCommand)

    // 6. Zip into .pkpass Buffer
    const zip = new AdmZip()
    const finalFiles = fs.readdirSync(tempDir)
    for (const f of finalFiles) {
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
