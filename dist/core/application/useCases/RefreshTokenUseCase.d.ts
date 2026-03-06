import type { IUserQueryRepository } from "../../../interfaces/repositories/UserRepository";
import type { TokenService } from "../../domain/services/TokenService";
import type { IRefreshTokenQueryRepository, IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository";
export declare class RefreshTokenUseCase {
    private readonly userQueryRepository;
    private readonly refreshTokenRepository;
    private readonly refreshTokenQueryRepository;
    private readonly tokenService;
    constructor(userQueryRepository: IUserQueryRepository, refreshTokenRepository: IRefreshTokenRepository, refreshTokenQueryRepository: IRefreshTokenQueryRepository, tokenService: TokenService);
    execute(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=RefreshTokenUseCase.d.ts.map