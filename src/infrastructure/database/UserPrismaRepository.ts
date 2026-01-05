import type { UserResponseDTO } from "../../interfaces/dtos/User/UserResponseDTO";
import type { IUserQueryRepository, IUserRepository } from "../../interfaces/repositories/UserRepository";
import { prismaClient } from "../../main/config/prisma-client";

class UserPrismaRepository implements IUserRepository {
    async create(email: string, passwordHash: string): Promise<UserResponseDTO> {
        const result = await prismaClient.user.create({
            data: {
                email: email,
                password: passwordHash
            },
            select: {
                id: true, 
                email: true,
                passwordChangeAt: true,
                deletedAt: true
            }
        })
        return result    
    }

    async softDelete(userId: string): Promise<void> {
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                deletedAt: new Date(),
                passwordChangeAt: new Date()
            }
        })
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

    async clearPasswordResetToken(userId: string): Promise<void> {
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                passwordResetToken: null,
                passwordResetExpiresAt: null
            }
        })
    }

    async updatePassword(userId: string, password: string): Promise<void> {
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                password,
                passwordResetToken: null,
                passwordResetExpiresAt: null,
                passwordChangeAt: new Date()
            }
        })
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
                passwordChangeAt: true,
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
                passwordChangeAt: true,
                deletedAt: true
            }
        })
        return result
    }

    async findByPasswordResetToken(tokenHash: string): Promise<{ id: string; } | null> {
        const result = await prismaClient.user.findFirst({
            where: {
                passwordResetToken: tokenHash
            },
            select: {
                id: true
            }
        })
        return result
    }

    async findUserWithPasswordByEmail(email: string): Promise<{ id: string, email :string, password: string } | null> {
        const result = await prismaClient.user.findFirst({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })
        return result
    }

    async findUserWithPasswordById(id: string): Promise<{ id: string; email: string; password: string; } | null> {
        const result = await prismaClient.user.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })
        return result
    }
}

export { UserPrismaRepository, UserPrismaQueryRepository }