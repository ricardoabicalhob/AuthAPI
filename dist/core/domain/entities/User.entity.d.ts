import { NameNormalizado } from "../value-objects/NameNormalizado";
type UserProps = {
    email: string;
    password: string;
    name: NameNormalizado;
    passwordResetToken?: string | null;
    passwordResetExpiresAt?: Date | null;
    passwordChangeAt?: Date | null;
    deletedAt?: Date | null;
};
export declare class User {
    private props;
    private id;
    private constructor();
    static create(props: UserProps): User;
    static restore(props: UserProps, id: string): User;
    getId(): string;
    getEmail(): string;
    getPassword(): string;
    getName(): string;
    getPasswordChangeAt(): Date | null | undefined;
    getPasswordChangeAtOrThrow(): Date;
    getDeletedAt(): Date | null | undefined;
    getDeletedAtOrThrow(): Date;
    getPasswordResetToken(): string | null | undefined;
    getPasswordResetTokenOrThrow(): string | null;
    getPasswordResetExpiresAt(): Date | null | undefined;
    getPasswordResetExpiresAtOrThrow(): Date | null;
    changePassword(newPasswordHash: string): void;
    markPasswordChanged(): void;
    setPasswordResetToken(tokenHash: string, expiresAt: Date): void;
    clearPasswordResetToken(): void;
    isPasswordResetTokenExpired(): boolean;
    softDelete(): void;
    isDeleted(): boolean;
}
export {};
//# sourceMappingURL=User.entity.d.ts.map