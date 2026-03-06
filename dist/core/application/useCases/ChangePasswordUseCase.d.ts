import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import type { UserPasswordHashService } from "../../domain/services/UserPasswordHashService";
export declare class ChangePasswordUseCase {
    private readonly userRepository;
    private readonly userQueryRepository;
    private readonly hashService;
    constructor(userRepository: IUserRepository, userQueryRepository: IUserQueryRepository, hashService: UserPasswordHashService);
    execute(userId: string, currentPassword: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=ChangePasswordUseCase.d.ts.map