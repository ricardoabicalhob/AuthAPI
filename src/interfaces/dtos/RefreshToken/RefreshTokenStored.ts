export interface RefreshTokenStored {
    id :string
    userId :string
    tokenHash :string
    expiresAt :Date
    revokeAt? :Date | null
    createdAt :Date
}