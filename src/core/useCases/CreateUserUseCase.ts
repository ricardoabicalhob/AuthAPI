import type { CreateUserDTO } from "../../interfaces/dtos/User/CreateUserDTO";
import type { IUserQueryRepository, IUserRepository } from "../../interfaces/repositories/UserRepository";
import type { HashService } from "../services/HashService";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :HashService
    ) {}

    async execute(data :CreateUserDTO) {
        const userAlreadExists = await this.userQueryRepository.findByEmail(data.email)

        if(userAlreadExists) {
            throw new Error('E-mail já cadastrado.')
        }

        const passwordHash = await this.hashService.hash(data.password)

        const user = await this.userRepository.create(
            data.email,
            passwordHash
        )

        return user
    }
}