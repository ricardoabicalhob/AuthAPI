import { randomBytes, createHash } from "crypto"
import jwt from "jsonwebtoken"
import { getPrivateKey, getPublicKey } from "../../../utils/keys"

interface JwtPayload {
  passwordChangeAt: Date,
    iat: number,
    exp: number,
    aud: string,
    iss: string,
    sub: string
}

export class TokenService {

    private privateKey = getPrivateKey()
    private publicKey = getPublicKey()

    generateAccessToken(userId :string, name :string, email :string, passwordChangeAt? :Date | null) {
        return jwt.sign(
            {
                name,
                email,
                passwordChangeAt: passwordChangeAt
                    ? Math.floor(passwordChangeAt.getTime() / 1000)
                    : undefined
            },
            this.privateKey,
            {
                algorithm: "RS256",
                subject: userId,
                expiresIn: "15m",
                issuer: "https://api-authapi.ricardodev.cloud",
                audience: "sgra-api",
                keyid: "auth-key-1"
            }
        )
    }

    generateRefreshToken() {
        const token = randomBytes(40).toString("hex")

        const hash = createHash("sha256")
                    .update(token)
                    .digest("hex")

        return {
            token, 
            hash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    }

    verifyAccessToken(token :string) {
        return jwt.verify(token, this.publicKey, {
            algorithms: ["RS256"],
            issuer: "https://api-authapi.ricardodev.cloud",
            audience: "sgra-api"
        }) as JwtPayload
    }

    hashToken(token: string) {
        return createHash("sha256")
                .update(token)
                .digest("hex")
    }

    generateResetToken() {
        const token = randomBytes(32).toString('hex')
        const hash = createHash("sha256").update(token).digest("hex")
        
        return { token, hash }
    }
}