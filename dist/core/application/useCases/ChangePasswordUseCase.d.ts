import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import type { PasswordHasher } from "../../domain/services/PasswordHasher";
export declare class ChangePasswordUseCase {
    private readonly userRepository;
    private readonly userQueryRepository;
    private readonly hashService;
    constructor(userRepository: IUserRepository, userQueryRepository: IUserQueryRepository, hashService: PasswordHasher);
    execute(userId: string, currentPassword: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=ChangePasswordUseCase.d.ts.map