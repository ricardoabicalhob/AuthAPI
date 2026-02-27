import type { RefreshTokenStored } from "../dtos/RefreshToken/RefreshTokenStored"

export interface IRefreshTokenRepository {
    create(data :{ userId :string, tokenHash :string, expiresAt :Date }) :Promise<void>
    revoke(id :string) :Promise<void>
}

export interface IRefreshTokenQueryRepository {
    findByHash(hash :string) :Promise<RefreshTokenStored | null>
}