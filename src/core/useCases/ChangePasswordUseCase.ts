import bcrypt from "bcrypt"
import type { IUserQueryRepository, IUserRepository } from "../../interfaces/repositories/UserRepository";
import type { HashService } from "../services/HashService";
import { UserNotFoundError } from "../erros/UserNotFoundError";
import { UnauthorizedError } from "../erros/UnauthorizedError";

export class ChangePasswordUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :HashService
    ) {}

    async execute(
        userId :string,
        currentPassword :string,
        newPassword :string
    ) :Promise<void> {

        const user = await this.userQueryRepository.findUserWithPasswordById(userId)

        if(!user) {
            throw new UserNotFoundError()
        }

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        )

        if(!passwordMatch) {
            throw new UnauthorizedError()
        }

        const newPasswordHash = await this.hashService.hash(newPassword)

        await this.userRepository.updatePassword(
            userId,
            newPasswordHash
        )
    }
}