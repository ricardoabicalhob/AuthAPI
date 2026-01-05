import type { CreateUserDTO } from "../dtos/User/CreateUserDTO";
import type { UserResponseDTO } from "../dtos/User/UserResponseDTO";

interface IUserRepository {
    create(email :string, passwordHash :string) :Promise<UserResponseDTO>
    softDelete(userId :string) :Promise<void>
    updatePassword(userId: string, password: string): Promise<void>
    savePasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>
    clearPasswordResetToken(userId: string): Promise<void>
}

interface IUserQueryRepository {
    findById(id :string) :Promise<UserResponseDTO | null>
    findByEmail(email :string) :Promise<UserResponseDTO | null>
    findByPasswordResetToken(token :string) :Promise<{ id :string } | null>
    findUserWithPasswordByEmail(email :string) :Promise<{ id :string, email :string, password :string } | null>
    findUserWithPasswordById(id :string) :Promise<{ id :string, email :string, password :string } | null>
}

export type { IUserRepository, IUserQueryRepository }