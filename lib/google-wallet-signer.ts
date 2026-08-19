import crypto from "crypto"
import { WalletCardData, WALLET_THEMES, DEFAULT_THEME_ID } from "./wallet-themes"

function base64UrlEncode(str: string | Buffer): string {
  return (typeof str === "string" ? Buffer.from(str) : str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
}

export function signJwtRS256(payload: object, privateKeyPem: string): string {
  const header = { alg: "RS256", typ: "JWT" }
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const dataToSign = `${encodedHeader}.${encodedPayload}`

  // Format private key properly if newlines were escaped
  let formattedKey = privateKeyPem.trim()
  if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
    formattedKey = formattedKey.slice(1, -1)
  }
  formattedKey = formattedKey.replace(/\\n/g, "\n")

  const sign = crypto.createSign("RSA-SHA256")
  sign.update(dataToSign)
  const signature = sign.sign(formattedKey)
  const encodedSignature = base64UrlEncode(signature)

  return `${dataToSign}.${encodedSignature}`
}

export function generateGoogleWalletSaveUrl(cardData: WalletCardData): string {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID || "BCR2DN6DTK643EAC"
  const classId = process.env.GOOGLE_WALLET_CLASS_ID || `${issuerId}.gdgq-card`
  const serviceAccountEmail =
    process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL || "gdgq-962@gdgcoc.iam.gserviceaccount.com"
  const privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY || ""

  const cardId = cardData.uuid
    ? `${issuerId}.${cardData.uuid.replace(/-/g, "_")}`
    : `${issuerId}.card_${Date.now()}`

  const theme = WALLET_THEMES[cardData.themeId] || WALLET_THEMES[DEFAULT_THEME_ID]
  const qrTargetUrl = cardData.uuid
    ? `https://gdg-q.com/p/${cardData.uuid}`
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

  // Build the generic object payload
  const genericObject = {
    id: cardId,
    classId: classId,
    cardTitle: {
      defaultValue: {
        language: "ar",
        value: "GDG QASSIM",
      },
    },
    header: {
      defaultValue: {
        language: "ar",
        value: cardData.fullName || "عضو GDG",
      },
    },
    subheader: {
      defaultValue: {
        language: "ar",
        value: majorValue,
      },
    },
    hexBackgroundColor: theme.bgHex || "#17130f",
    logo: {
      sourceUri: {
        uri: "https://gdg-q.com/logo.png",
      },
      contentDescription: {
        defaultValue: {
          language: "ar",
          value: "GDG Qassim Logo",
        },
      },
    },
    textModulesData: [
      {
        id: "institution",
        header: "الصرح التعليمي",
        body: institutionValue,
      },
      {
        id: "level",
        header: "المستوى / المرحلة",
        body: levelValue,
      },
      ...(cardData.phone
        ? [
            {
              id: "phone",
              header: "الجوال",
              body: `${cardData.countryCode || "+966"} ${cardData.phone}`,
            },
          ]
        : []),
      ...(cardData.email
        ? [
            {
              id: "email",
              header: "البريد الإلكتروني",
              body: cardData.email,
            },
          ]
        : []),
    ],
    barcode: {
      type: "QR_CODE",
      value: qrTargetUrl,
      alternateText: cardData.uuid?.slice(0, 8).toUpperCase() || "GDGQ",
    },
  }

  const jwtClaims = {
    iss: serviceAccountEmail,
    aud: "google",
    typ: "savetoandroidpay",
    iat: Math.floor(Date.now() / 1000),
    origins: ["https://gdg-q.com", "http://localhost:3000"],
    payload: {
      genericObjects: [genericObject],
    },
  }

  if (!privateKey) {
    // Return fallback URL if private key not injected yet
    return `https://pay.google.com/gp/v/save/${cardData.uuid || "demo"}`
  }

  try {
    const signedToken = signJwtRS256(jwtClaims, privateKey)
    return `https://pay.google.com/gp/v/save/${signedToken}`
  } catch (error) {
    console.error("Error signing Google Wallet JWT:", error)
    return `https://pay.google.com/gp/v/save/${cardData.uuid || "demo"}`
  }
}
