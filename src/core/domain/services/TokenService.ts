import crypto from "crypto"
import jwt from "jsonwebtoken"
import { getPrivateKey } from "../../../utils/keys"

interface JwtPayload {
  sub: string
  passwordChangeAt?: number
}

export class TokenService {

    private privateKey = getPrivateKey()
    private refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!

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

    // generateRefreshToken(userId :string, passwordChangeAt? :Date | null) {
    generateRefreshToken() {
        const token = crypto.randomBytes(40).toString("hex")

        const hash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")

        return {token, hash}
        // return jwt.sign(
        //     {
        //         passwordChangeAt: passwordChangeAt
        //             ? Math.floor(passwordChangeAt.getTime() / 1000)
        //             : undefined
        //     },
        //     this.refreshTokenSecret,
        //     {
        //         subject: userId,
        //         expiresIn: "7d"
        //     }
        // )
    }

    verifyAccessToken(token :string) {
        return jwt.verify(token, this.privateKey) as JwtPayload
    }

    verifyRefreshToken(token :string) {
        return jwt.verify(token, this.refreshTokenSecret) as JwtPayload
    }

    generateResetToken() {
        const token = crypto.randomBytes(32).toString('hex')
        const hash = crypto.createHash("sha256").update(token).digest("hex")
        
        return { token, hash }
    }
}