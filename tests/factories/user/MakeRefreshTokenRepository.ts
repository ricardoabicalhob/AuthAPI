import { type Mocked, vi } from "vitest"
import type {
  IRefreshTokenRepository,
  IRefreshTokenQueryRepository
} from "../../../src/interfaces/repositories/RefreshTokenRepository"

export function makeRefreshTokenRepositoryMock(): Mocked<IRefreshTokenRepository> {
  return {
    create: vi.fn(),
    revoke: vi.fn(),
    revokeAllByUserId: vi.fn()
  }
}

export function makeRefreshTokenQueryRepositoryMock(): Mocked<IRefreshTokenQueryRepository> {
  return {
    findByHash: vi.fn()
  }
}