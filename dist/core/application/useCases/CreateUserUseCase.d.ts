import type { CreateUserDTO } from "../../../interfaces/dtos/User/CreateUserDTO";
import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import type { PasswordHasher } from "../../domain/services/PasswordHasher";
export declare class CreateUserUseCase {
    private readonly userRepository;
    private readonly userQueryRepository;
    private readonly hashService;
    constructor(userRepository: IUserRepository, userQueryRepository: IUserQueryRepository, hashService: PasswordHasher);
    execute(data: CreateUserDTO): Promise<import("../../../interfaces/dtos/User/UserResponseDTO").UserResponseDTO>;
}
//# sourceMappingURL=CreateUserUseCase.d.ts.map