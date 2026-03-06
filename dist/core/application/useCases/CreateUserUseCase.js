"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const User_entity_1 = require("../../domain/entities/User.entity");
const EmailAlreadyRegisteredError_1 = require("../../domain/erros/EmailAlreadyRegisteredError");
const NameNormalizado_1 = require("../../domain/value-objects/NameNormalizado");
class CreateUserUseCase {
    userRepository;
    userQueryRepository;
    hashService;
    constructor(userRepository, userQueryRepository, hashService) {
        this.userRepository = userRepository;
        this.userQueryRepository = userQueryRepository;
        this.hashService = hashService;
    }
    async execute(data) {
        const userAlreadExists = await this.userQueryRepository.findByEmail(data.email);
        if (userAlreadExists) {
            throw new EmailAlreadyRegisteredError_1.EmailAlreadyRegisteredError();
        }
        const passwordHash = await this.hashService.hash(data.password);
        const user = User_entity_1.User.create({
            email: data.email,
            name: new NameNormalizado_1.NameNormalizado(data.name),
            password: passwordHash
        });
        const userCreated = await this.userRepository.create(user.getId(), user.getEmail(), user.getName(), user.getPassword());
        return userCreated;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=CreateUserUseCase.js.map