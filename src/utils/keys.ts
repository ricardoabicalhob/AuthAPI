import { createPublicKey, createPrivateKey } from "crypto"

export function getPublicKey() {
  const publicKeyPem = Buffer
    .from(process.env.JWT_PUBLIC_KEY_BASE64!, "base64")
    .toString("utf-8")

  return createPublicKey({
    key: publicKeyPem,
    format: "pem",
    type: "spki"
  })
}

export function getPrivateKey() {
  const privateKeyPem = Buffer
    .from(process.env.JWT_PRIVATE_KEY_BASE64!, "base64")
    .toString("utf-8")

  return createPrivateKey({
    key: privateKeyPem,
    format: "pem",
    type: "pkcs8"
  })
}