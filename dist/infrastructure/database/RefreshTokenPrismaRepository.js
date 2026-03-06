"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenPrismaQueryRepository = exports.RefreshTokenPrismaRepository = void 0;
const prisma_client_1 = require("../../main/config/prisma-client");
class RefreshTokenPrismaRepository {
    async create(data) {
        await prisma_client_1.prismaClient.refreshToken.create({
            data: {
                userId: data.userId,
                tokenHash: data.tokenHash,
                expiresAt: data.expiresAt
            }
        });
    }
    async revoke(id) {
        await prisma_client_1.prismaClient.refreshToken.update({
            where: { id },
            data: {
                revokedAt: new Date()
            }
        });
    }
    async revokeAllByUserId(userId) {
        await prisma_client_1.prismaClient.refreshToken.updateMany({
            where: {
                userId,
                revokedAt: null
            },
            data: {
                revokedAt: new Date()
            }
        });
    }
}
exports.RefreshTokenPrismaRepository = RefreshTokenPrismaRepository;
class RefreshTokenPrismaQueryRepository {
    async findByHash(hash) {
        const token = await prisma_client_1.prismaClient.refreshToken.findUnique({
            where: { tokenHash: hash }
        });
        if (!token)
            return null;
        return {
            id: token.id,
            userId: token.userId,
            tokenHash: token.tokenHash,
            expiresAt: token.expiresAt,
            revokedAt: token.revokedAt,
            createdAt: token.createdAt
        };
    }
}
exports.RefreshTokenPrismaQueryRepository = RefreshTokenPrismaQueryRepository;
//# sourceMappingURL=RefreshTokenPrismaRepository.js.map