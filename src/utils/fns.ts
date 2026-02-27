export function parseKeyBase64ToUTF8(key_base64 :string) {
    return Buffer
        .from(key_base64, "base64")
        .toString("utf-8")
}

// const privateKey = Buffer
//   .from(process.env.JWT_PRIVATE_KEY_BASE64!, "base64")
//   .toString("utf-8")

// const publicKey = Buffer
//   .from(process.env.JWT_PUBLIC_KEY_BASE64!, "base64")
//   .toString("utf-8")