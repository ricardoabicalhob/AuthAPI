interface JwtPayload {
    passwordChangeAt: Date;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;
}
export declare class TokenService {
    private privateKey;
    private publicKey;
    generateAccessToken(userId: string, name: string, email: string, passwordChangeAt?: Date | null): string;
    generateRefreshToken(): {
        token: string;
        hash: string;
        expiresAt: Date;
    };
    verifyAccessToken(token: string): JwtPayload;
    hashToken(token: string): string;
    generateResetToken(): {
        token: string;
        hash: string;
    };
}
export {};
//# sourceMappingURL=TokenService.d.ts.map