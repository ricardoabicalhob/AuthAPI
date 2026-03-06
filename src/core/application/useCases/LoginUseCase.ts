import bcrypt from "bcrypt"
import type { LoginResponseDTO } from "../../../interfaces/dtos/Login/LoginResponseDTO";
import type { IUserQueryRepository } from "../../../interfaces/repositories/UserRepository";
import type { TokenService } from "../../domain/services/TokenService";
import { InvalidCredentialsError } from "../../domain/erros/InvalidCredentialError";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError";
import type { IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";
import { UserMapper } from "../mappers/UserMapper";

export class LoginUseCase {
    constructor(
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly refreshTokenRepository :IRefreshTokenRepository,
        private readonly tokenService :TokenService
    ) {}

    async execute(email :string, password :string) :Promise<LoginResponseDTO> {
        const userPersistido = await this.userQueryRepository.findByEmail(email)

        if(!userPersistido) {
            throw new UnauthorizedError()
        }

        if(userPersistido.deletedAt !== null) {
            throw new UserNotFoundError()
        }

        const user = UserMapper.toDomain(userPersistido)

        const passwordIsValid = await bcrypt.compare(
            password,
            user.getPassword()
        )

        if(!passwordIsValid) {
            throw new InvalidCredentialsError()
        }

        const accessToken = this.tokenService.generateAccessToken(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPasswordChangeAt()
        )

        const { token, hash, expiresAt } = this.tokenService.generateRefreshToken()
        await this.refreshTokenRepository.create({
            userId: user.getId(),
            tokenHash: hash,
            expiresAt
        })

        return {
            accessToken,
            refreshToken: token
        }
    }
}