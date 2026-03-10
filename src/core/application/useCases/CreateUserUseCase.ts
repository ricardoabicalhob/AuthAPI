import type { CreateUserDTO } from "../../../interfaces/dtos/User/CreateUserDTO";
import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import { User } from "../../domain/entities/User.entity";
import { EmailAlreadyRegisteredError } from "../../domain/erros/EmailAlreadyRegisteredError";
import type { PasswordHasher } from "../../domain/services/PasswordHasher";
import { Email } from "../../domain/value-objects/Email";
import { NormalizedName } from "../../domain/value-objects/NameNormalizado";
import { Password } from "../../domain/value-objects/Password";
import { PasswordHash } from "../../domain/value-objects/PasswordHash";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :PasswordHasher
    ) {}

    async execute(data :CreateUserDTO) {
        const userAlreadExists = await this.userQueryRepository.findByEmail(data.email)

        if(userAlreadExists) {
            throw new EmailAlreadyRegisteredError()
        }

        const email = Email.create(data.email)
        const name = NormalizedName.create(data.name)
        const password = Password.create(data.password)

        const hash = await this.hashService.hash(password.getValue())

        const passwordHash = PasswordHash.create(hash)

        const user = User.create({
            email: email,
            name: name,
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