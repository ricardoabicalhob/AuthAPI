interface RefreshTokenProps {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    revokedAt?: Date | null;
    createdAt?: Date;
}
export declare class RefreshToken {
    private props;
    private id;
    private constructor();
    static create(props: RefreshTokenProps): RefreshToken;
    static restore(props: RefreshTokenProps, id: string): RefreshToken;
    getId(): string;
    getUserId(): string;
    getTokenHash(): string;
    getExpiresAt(): Date;
    getCreatedAt(): Date;
    getRevokedAt(): Date | null;
    revoke(): void;
    isExpired(): boolean;
    isRevoked(): boolean;
    isActive(): boolean;
}
export {};
//# sourceMappingURL=RefreshToken.d.ts.map