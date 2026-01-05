import bcrypt from "bcrypt"
import type { LoginResponseDTO } from "../../interfaces/dtos/Login/LoginResponseDTO";
import type { IUserQueryRepository } from "../../interfaces/repositories/UserRepository";
import type { TokenService } from "../services/TokenService";
import { InvalidCredentialsError } from "../erros/InvalidCredentialError";
import { UserNotFoundError } from "../erros/UserNotFoundError";

export class LoginUseCase {
    constructor(
        private readonly userQueryRepository :IUserQueryRepository,
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
        const refreshToken = this.tokenService.generateRefreshToken(user.id)

        return {
            accessToken,
            refreshToken
        }
    }
}