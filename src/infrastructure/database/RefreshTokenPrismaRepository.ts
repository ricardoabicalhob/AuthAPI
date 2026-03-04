import type { RefreshTokenStored } from "../../interfaces/dtos/RefreshToken/RefreshTokenStored";
import type { IRefreshTokenQueryRepository, IRefreshTokenRepository } from "../../interfaces/repositories/RefreshTokenRepository";
import { prismaClient } from "../../main/config/prisma-client";

class RefreshTokenPrismaRepository implements IRefreshTokenRepository {
    async create(data: { userId: string; tokenHash: string; expiresAt: Date; }): Promise<void> {
        await prismaClient.refreshToken.create({
            data: {
                userId: data.userId,
                tokenHash: data.tokenHash,
                expiresAt: data.expiresAt
            }
        })
    }

    async revoke(id: string): Promise<void> {
        await prismaClient.refreshToken.update({
            where: { id },
            data: {
                revokedAt: new Date()
            }
        })
    }

    async revokeAllByUserId(userId: string): Promise<void> {
        await prismaClient.refreshToken.updateMany({
            where: {
                userId,
                revokedAt: null
            },
            data: {
                revokedAt: new Date()
            }
        })
    }
}

class RefreshTokenPrismaQueryRepository implements IRefreshTokenQueryRepository {
    async findByHash(hash: string): Promise<RefreshTokenStored | null> {
        const token = await prismaClient.refreshToken.findUnique({
            where: { tokenHash: hash }
        })

        if(!token) return null

        return {
            id: token.id,
            userId: token.userId,
            tokenHash: token.tokenHash,
            expiresAt: token.expiresAt,
            revokedAt: token.revokedAt,
            createdAt: token.createdAt
        }
    }
}

export { RefreshTokenPrismaRepository, RefreshTokenPrismaQueryRepository }