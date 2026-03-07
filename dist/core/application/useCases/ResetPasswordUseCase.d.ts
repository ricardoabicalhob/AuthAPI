import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import type { PasswordHasher } from "../../domain/services/PasswordHasher";
import type { TokenHashService } from "../../domain/services/TokenHashService";
export declare class ResetPasswordUseCase {
    private readonly userRepository;
    private readonly userQueryRepository;
    private readonly hashService;
    private readonly tokenHashService;
    constructor(userRepository: IUserRepository, userQueryRepository: IUserQueryRepository, hashService: PasswordHasher, tokenHashService: TokenHashService);
    execute(token: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=ResetPasswordUseCase.d.ts.map