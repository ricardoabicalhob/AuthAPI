import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import type { UserPasswordHashService } from "../../domain/services/UserPasswordHashService";
import type { TokenHashService } from "../../domain/services/TokenHashService";
export declare class ResetPasswordUseCase {
    private readonly userRepository;
    private readonly userQueryRepository;
    private readonly hashService;
    private readonly tokenHashService;
    constructor(userRepository: IUserRepository, userQueryRepository: IUserQueryRepository, hashService: UserPasswordHashService, tokenHashService: TokenHashService);
    execute(token: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=ResetPasswordUseCase.d.ts.map