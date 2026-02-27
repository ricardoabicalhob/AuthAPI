import bcrypt from "bcrypt"
import type { LoginResponseDTO } from "../../../interfaces/dtos/Login/LoginResponseDTO";
import type { IUserQueryRepository } from "../../../interfaces/repositories/UserRepository";
import type { TokenService } from "../../domain/services/TokenService";
import { InvalidCredentialsError } from "../../domain/erros/InvalidCredentialError";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError";
import type { IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository";

export class LoginUseCase {
    constructor(
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly refreshTokenRepository :IRefreshTokenRepository,
        private readonly tokenService :TokenService
    ) {}

    async execute(email :string, password :string) :Promise<LoginResponseDTO> {
        const user = await this.userQueryRepository.findByEmail(email)

        if(!user) {
            throw new InvalidCredentialsError()
        }

        if(user.deletedAt !== null) {
            throw new UserNotFoundError()
        }

        const userWithPassword = await this.userQueryRepository.findUserWithPasswordByEmail(email)

        if(!userWithPassword) {
            throw new InvalidCredentialsError()
        }

        const passwordIsValid = await bcrypt.compare(
            password,
            userWithPassword.password
        )

        if(!passwordIsValid) {
            throw new InvalidCredentialsError()
        }

        const accessToken = this.tokenService.generateAccessToken(user.id)

        const { token, hash } = this.tokenService.generateRefreshToken()
        await this.refreshTokenRepository.create({
            userId: user.id,
            tokenHash: hash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        return {
            accessToken,
            refreshToken: token
        }
    }
}