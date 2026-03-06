import type { CreateUserDTO } from "../../../interfaces/dtos/User/CreateUserDTO";
import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import { User } from "../../domain/entities/User.entity";
import { EmailAlreadyRegisteredError } from "../../domain/erros/EmailAlreadyRegisteredError";
import type { UserPasswordHashService } from "../../domain/services/UserPasswordHashService";
import { NameNormalizado } from "../../domain/value-objects/NameNormalizado";

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

        const user = User.create({
            email: data.email,
            name: new NameNormalizado(data.name),
            password: passwordHash
        })

        const userCreated = await this.userRepository.create(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getPassword()
        )

        return userCreated
    }
}