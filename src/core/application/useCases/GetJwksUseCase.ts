import { exportJWK } from "jose"
import { createPublicKey } from "crypto"
import { getPublicKey } from "../../../utils/keys"

export class GetJwksUseCase {
    async execute() {
        const publicKey = getPublicKey()

        const jwk = await exportJWK(publicKey)
    
        return {
            keys: [
                {
                    ...jwk,
                    kid: "auth-key-1",
                    alg: "RS256",
                    use: "sig"
                }
            ]
        }
    }
}