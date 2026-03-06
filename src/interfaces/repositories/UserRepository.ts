import type { UserResponseDTO } from "../dtos/User/UserResponseDTO";

interface IUserRepository {
    create(id: string, email :string, name :string, passwordHash :string) :Promise<UserResponseDTO>
    softDelete(
        userId :string,
        passwordChangeAt :Date | null, 
        deletedAt :Date | null    
    ) :Promise<void>
    updatePassword(
        userId: string, 
        password: string,
        passwordChangeAt :Date
    ): Promise<void>
    savePasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>
    clearPasswordResetToken(
        userId: string,
        passwordResetToken :string | null, 
        passwordResetExpiresAt :Date | null
    ): Promise<void>
}

interface IUserQueryRepository {
    findById(id :string) :Promise<UserResponseDTO | null>
    findByEmail(email :string) :Promise<UserResponseDTO | null>
    findByPasswordResetToken(token :string) :Promise<UserResponseDTO | null>
    findUserWithPasswordById(id :string) :Promise<UserResponseDTO | null>
}

export type { IUserRepository, IUserQueryRepository }