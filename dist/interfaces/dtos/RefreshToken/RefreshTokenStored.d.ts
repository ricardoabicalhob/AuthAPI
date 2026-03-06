export interface RefreshTokenStored {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    revokedAt?: Date | null;
    createdAt: Date;
}
//# sourceMappingURL=RefreshTokenStored.d.ts.map