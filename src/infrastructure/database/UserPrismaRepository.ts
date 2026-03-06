import type { UserResponseDTO } from "../../interfaces/dtos/User/UserResponseDTO";
import type { IUserQueryRepository, IUserRepository } from "../../interfaces/repositories/UserRepository";
import { prismaClient } from "../../main/config/prisma-client";

class UserPrismaRepository implements IUserRepository {
    async create(id: string, email: string, name :string, passwordHash: string): Promise<UserResponseDTO> {
        const result = await prismaClient.user.create({
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
        })
        return result    
    }

    async softDelete(userId: string, passwordChangeAt :Date | null, deletedAt :Date | null): Promise<void> {

        const now = new Date()

        await prismaClient.$transaction([
            prismaClient.user.update({
                where: {
                    id: userId
                },
                data: {
                    deletedAt: deletedAt,
                    passwordChangeAt: passwordChangeAt
                }
            }),

            prismaClient.refreshToken.updateMany({
                where: {
                    userId,
                    revokedAt: null
                },
                data: {
                    revokedAt: now
                }
            })
        ])
    }

    async savePasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
        await prismaClient.user.update({
            where: {
                id: userId,
            },
            data: {
                passwordResetToken: tokenHash,
                passwordResetExpiresAt: expiresAt
            }
        })
    }

    async clearPasswordResetToken(userId: string, passwordResetToken :string | null, passwordResetExpiresAt :Date | null): Promise<void> {
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                passwordResetToken: passwordResetToken,
                passwordResetExpiresAt: passwordResetExpiresAt
            }
        })
    }

    async updatePassword(
        userId: string, 
        password: string,
        passwordChangeAt :Date
    ): Promise<void> {

        const now = new Date()
        
        await prismaClient.$transaction([
            prismaClient.user.update({
                where: {
                    id: userId
                },
                data: {
                    password,
                    passwordChangeAt: passwordChangeAt
                }
            }),

            prismaClient.refreshToken.updateMany({
                where: {
                    userId,
                    revokedAt: null
                },
                data: {
                    revokedAt: now
                }
            })
        ])
    }
}

class UserPrismaQueryRepository implements IUserQueryRepository {
    async findById(id: string): Promise<UserResponseDTO | null> {
        const result = await prismaClient.user.findUnique({
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
        })
        return result
    }

    async findByEmail(email: string): Promise<UserResponseDTO | null> {
        const result = await prismaClient.user.findUnique({
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
        })
        return result
    }

    async findByPasswordResetToken(tokenHash: string): Promise<UserResponseDTO | null> {
        const result = await prismaClient.user.findFirst({
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
        })
        return result
    }

    async findUserWithPasswordById(id: string): Promise<UserResponseDTO | null> {
        const result = await prismaClient.user.findFirst({
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
        })
        return result
    }
}

export { UserPrismaRepository, UserPrismaQueryRepository }