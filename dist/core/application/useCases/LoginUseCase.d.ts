import type { LoginResponseDTO } from "../../../interfaces/dtos/Login/LoginResponseDTO";
import type { IUserQueryRepository } from "../../../interfaces/repositories/UserRepository";
import type { TokenService } from "../../domain/services/TokenService";
import type { IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository";
export declare class LoginUseCase {
    private readonly userQueryRepository;
    private readonly refreshTokenRepository;
    private readonly tokenService;
    constructor(userQueryRepository: IUserQueryRepository, refreshTokenRepository: IRefreshTokenRepository, tokenService: TokenService);
    execute(email: string, password: string): Promise<LoginResponseDTO>;
}
//# sourceMappingURL=LoginUseCase.d.ts.map