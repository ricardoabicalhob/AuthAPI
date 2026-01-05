import crypto from "crypto"
import jwt from "jsonwebtoken"

interface JwtPayload {
  sub: string
  passwordChangeAt?: number
}

export class TokenService {

    private accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!
    private refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!

    generateAccessToken(userId :string, passwordChangeAt? :Date | null) {
        return jwt.sign(
            {
                passwordChangeAt: passwordChangeAt
                    ? Math.floor(passwordChangeAt.getTime() / 1000)
                    : undefined
            },
            this.accessTokenSecret,
            {
                subject: userId,
                expiresIn: "15m"
            }
        )
    }

    generateRefreshToken(userId :string, passwordChangeAt? :Date | null) {
        return jwt.sign(
            {
                passwordChangeAt: passwordChangeAt
                    ? Math.floor(passwordChangeAt.getTime() / 1000)
                    : undefined
            },
            this.refreshTokenSecret,
            {
                subject: userId,
                expiresIn: "7d"
            }
        )
    }

    verifyRefreshToken(token :string) {
        return jwt.verify(token, this.refreshTokenSecret) as JwtPayload
    }

    verifyAccessToken(token :string) {
        return jwt.verify(token, this.accessTokenSecret) as JwtPayload
    }

    generateResetToken() {
        const token = crypto.randomBytes(32).toString('hex')
        const hash = crypto.createHash("sha256").update(token).digest("hex")
        
        return { token, hash }
    }
}