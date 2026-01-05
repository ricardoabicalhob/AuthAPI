import { type Mocked, vi } from "vitest"
import type {
  IUserRepository,
  IUserQueryRepository
} from "../../../src/interfaces/repositories/UserRepository"

export function makeUserRepositoryMock(): Mocked<IUserRepository> {
  return {
    create: vi.fn(),
    softDelete: vi.fn(),
    updatePassword: vi.fn(),
    savePasswordResetToken: vi.fn(),
    clearPasswordResetToken: vi.fn()
  }
}

export function makeUserQueryRepositoryMock(): Mocked<IUserQueryRepository> {
  return {
    findById: vi.fn(),
    findByEmail: vi.fn(),
    findByPasswordResetToken: vi.fn(),
    findUserWithPasswordByEmail: vi.fn(),
    findUserWithPasswordById: vi.fn()
  }
}
