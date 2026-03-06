import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import type { MailService } from "../../domain/services/MailService";
import type { TokenService } from "../../domain/services/TokenService";
export declare class RequestPasswordResetUseCase {
    private readonly userRepository;
    private readonly userQueryRepository;
    private readonly tokenService;
    private readonly mailService;
    constructor(userRepository: IUserRepository, userQueryRepository: IUserQueryRepository, tokenService: TokenService, mailService: MailService);
    execute(email: string): Promise<void>;
}
//# sourceMappingURL=RequestPasswordResetUseCase.d.ts.map