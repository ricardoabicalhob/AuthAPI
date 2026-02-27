import type { CreateUserDTO } from "../../../interfaces/dtos/User/CreateUserDTO";
import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import { EmailAlreadyRegisteredError } from "../../domain/erros/EmailAlreadyRegisteredError";
import type { UserPasswordHashService } from "../../domain/services/UserPasswordHashService";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :UserPasswordHashService
    ) {}

    async execute(data :CreateUserDTO) {
        const userAlreadExists = await this.userQueryRepository.findByEmail(data.email)

        if(userAlreadExists) {
            throw new EmailAlreadyRegisteredError()
        }

        const passwordHash = await this.hashService.hash(data.password)

        const user = await this.userRepository.create(
            data.email,
            passwordHash
        )

        return user
    }
}