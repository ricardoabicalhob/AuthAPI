import type { IUserQueryRepository } from "../../interfaces/repositories/UserRepository";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { UserNotFoundError } from "../erros/UserNotFoundError";
import type { TokenService } from "../services/TokenService";

export class RefreshTokenUseCase {
    constructor(
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly tokenService :TokenService
    ) {}

    async execute(refreshToken :string) {
        let payload

        try {
            payload = this.tokenService.verifyRefreshToken(refreshToken)
        } catch (error) {
            throw new UnauthorizedError()
        }

        const userId = payload.sub

        const user = await this.userQueryRepository.findById(userId)

        if(!user) {
            throw new UserNotFoundError()
        }

        if(
            user.passwordChangeAt &&
            payload.passwordChangeAt &&
            payload.passwordChangeAt < Math.floor(user.passwordChangeAt.getTime() / 1000)
        ) {
            throw new UnauthorizedError()
        }

        const newAccessToken = this.tokenService.generateAccessToken(
            user.id,
            user.passwordChangeAt
        )

        return {
            accessToken: newAccessToken
        }
    }
}