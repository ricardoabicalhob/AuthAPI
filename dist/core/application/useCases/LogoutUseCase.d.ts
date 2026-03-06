import type { IRefreshTokenQueryRepository, IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository";
import type { TokenHashService } from "../../domain/services/TokenHashService";
export declare class LogoutUseCase {
    private readonly refreshTokenQueryRepository;
    private readonly refreshTokenRepository;
    private readonly tokenHashService;
    constructor(refreshTokenQueryRepository: IRefreshTokenQueryRepository, refreshTokenRepository: IRefreshTokenRepository, tokenHashService: TokenHashService);
    execute(refreshToken: string): Promise<void>;
}
//# sourceMappingURL=LogoutUseCase.d.ts.map