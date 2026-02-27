import crypto from "crypto"
import jwt from "jsonwebtoken"
import { getPrivateKey } from "../../../utils/keys"

interface JwtPayload {
  sub: string
  passwordChangeAt?: number
}

export class TokenService {

    private privateKey = getPrivateKey()

    generateAccessToken(userId :string, passwordChangeAt? :Date | null) {
        return jwt.sign(
            {
                passwordChangeAt: passwordChangeAt
                    ? Math.floor(passwordChangeAt.getTime() / 1000)
                    : undefined
            },
            this.privateKey,
            {
                algorithm: "RS256",
                subject: userId,
                expiresIn: "15m",
                issuer: "http://localhost:3100",
                audience: "sgra-api",
                keyid: "auth-key-1"
            }
        )
    }

    generateRefreshToken() {
        const token = crypto.randomBytes(40).toString("hex")

        const hash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")

        return {
            token, 
            hash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    }

    verifyAccessToken(token :string) {
        return jwt.verify(token, this.privateKey) as JwtPayload
    }

    hashToken(token: string) {
        return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")
    }

    generateResetToken() {
        const token = crypto.randomBytes(32).toString('hex')
        const hash = crypto.createHash("sha256").update(token).digest("hex")
        
        return { token, hash }
    }
}