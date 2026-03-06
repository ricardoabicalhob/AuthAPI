import type { RefreshTokenStored } from "../../interfaces/dtos/RefreshToken/RefreshTokenStored";
import type { IRefreshTokenQueryRepository, IRefreshTokenRepository } from "../../interfaces/repositories/RefreshTokenRepository";
declare class RefreshTokenPrismaRepository implements IRefreshTokenRepository {
    create(data: {
        userId: string;
        tokenHash: string;
        expiresAt: Date;
    }): Promise<void>;
    revoke(id: string): Promise<void>;
    revokeAllByUserId(userId: string): Promise<void>;
}
declare class RefreshTokenPrismaQueryRepository implements IRefreshTokenQueryRepository {
    findByHash(hash: string): Promise<RefreshTokenStored | null>;
}
export { RefreshTokenPrismaRepository, RefreshTokenPrismaQueryRepository };
//# sourceMappingURL=RefreshTokenPrismaRepository.d.ts.map