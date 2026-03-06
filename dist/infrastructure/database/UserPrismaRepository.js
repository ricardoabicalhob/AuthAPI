"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrismaQueryRepository = exports.UserPrismaRepository = void 0;
const prisma_client_1 = require("../../main/config/prisma-client");
class UserPrismaRepository {
    async create(id, email, name, passwordHash) {
        const result = await prisma_client_1.prismaClient.user.create({
            data: {
                id: id,
                email: email,
                name: name,
                password: passwordHash
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                passwordChangeAt: true,
                passwordResetToken: true,
                passwordResetExpiresAt: true,
                deletedAt: true
            }
        });
        return result;
    }
    async softDelete(userId, passwordChangeAt, deletedAt) {
        const now = new Date();
        await prisma_client_1.prismaClient.$transaction([
            prisma_client_1.prismaClient.user.update({
                where: {
                    id: userId
                },
                data: {
                    deletedAt: deletedAt,
                    passwordChangeAt: passwordChangeAt
                }
            }),
            prisma_client_1.prismaClient.refreshToken.updateMany({
                where: {
                    userId,
                    revokedAt: null
                },
                data: {
                    revokedAt: now
                }
            })
        ]);
    }
    async savePasswordResetToken(userId, tokenHash, expiresAt) {
        await prisma_client_1.prismaClient.user.update({
            where: {
                id: userId,
            },
            data: {
                passwordResetToken: tokenHash,
                passwordResetExpiresAt: expiresAt
            }
        });
    }
    async clearPasswordResetToken(userId, passwordResetToken, passwordResetExpiresAt) {
        await prisma_client_1.prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                passwordResetToken: passwordResetToken,
                passwordResetExpiresAt: passwordResetExpiresAt
            }
        });
    }
    async updatePassword(userId, password, passwordChangeAt) {
        const now = new Date();
        await prisma_client_1.prismaClient.$transaction([
            prisma_client_1.prismaClient.user.update({
                where: {
                    id: userId
                },
                data: {
                    password,
                    passwordChangeAt: passwordChangeAt
                }
            }),
            prisma_client_1.prismaClient.refreshToken.updateMany({
                where: {
                    userId,
                    revokedAt: null
                },
                data: {
                    revokedAt: now
                }
            })
        ]);
    }
}
exports.UserPrismaRepository = UserPrismaRepository;
class UserPrismaQueryRepository {
    async findById(id) {
        const result = await prisma_client_1.prismaClient.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                passwordChangeAt: true,
                passwordResetToken: true,
                passwordResetExpiresAt: true,
                deletedAt: true
            }
        });
        return result;
    }
    async findByEmail(email) {
        const result = await prisma_client_1.prismaClient.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                passwordChangeAt: true,
                passwordResetToken: true,
                passwordResetExpiresAt: true,
                deletedAt: true
            }
        });
        return result;
    }
    async findByPasswordResetToken(tokenHash) {
        const result = await prisma_client_1.prismaClient.user.findFirst({
            where: {
                passwordResetToken: tokenHash
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                passwordChangeAt: true,
                passwordResetToken: true,
                passwordResetExpiresAt: true,
                deletedAt: true
            }
        });
        return result;
    }
    async findUserWithPasswordById(id) {
        const result = await prisma_client_1.prismaClient.user.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                passwordChangeAt: true,
                passwordResetToken: true,
                passwordResetExpiresAt: true,
                deletedAt: true
            }
        });
        return result;
    }
}
exports.UserPrismaQueryRepository = UserPrismaQueryRepository;
//# sourceMappingURL=UserPrismaRepository.js.map