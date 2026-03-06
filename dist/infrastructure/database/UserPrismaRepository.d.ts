import type { UserResponseDTO } from "../../interfaces/dtos/User/UserResponseDTO";
import type { IUserQueryRepository, IUserRepository } from "../../interfaces/repositories/UserRepository";
declare class UserPrismaRepository implements IUserRepository {
    create(id: string, email: string, name: string, passwordHash: string): Promise<UserResponseDTO>;
    softDelete(userId: string, passwordChangeAt: Date | null, deletedAt: Date | null): Promise<void>;
    savePasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
    clearPasswordResetToken(userId: string, passwordResetToken: string | null, passwordResetExpiresAt: Date | null): Promise<void>;
    updatePassword(userId: string, password: string, passwordChangeAt: Date): Promise<void>;
}
declare class UserPrismaQueryRepository implements IUserQueryRepository {
    findById(id: string): Promise<UserResponseDTO | null>;
    findByEmail(email: string): Promise<UserResponseDTO | null>;
    findByPasswordResetToken(tokenHash: string): Promise<UserResponseDTO | null>;
    findUserWithPasswordById(id: string): Promise<UserResponseDTO | null>;
}
export { UserPrismaRepository, UserPrismaQueryRepository };
//# sourceMappingURL=UserPrismaRepository.d.ts.map