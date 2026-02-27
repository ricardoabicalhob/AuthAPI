import { createPublicKey } from "crypto"
import { exportJWK } from "jose"

const publicKeyPem = Buffer
    .from(process.env.JWT_PUBLIC_KEY_BASE64!, "base64")
    .toString("utf-8")

export async function getJwks() {
    const keyObject = createPublicKey(publicKeyPem)
    const jwk = await exportJWK(keyObject)

    return {
        keys: [
            {
                ...jwk,
                use: "sig",
                alg: "RS256",
                kid: "auth-key-1"
            }
        ]
    }
}