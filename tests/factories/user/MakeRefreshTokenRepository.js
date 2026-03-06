import { vi } from "vitest";
export function makeRefreshTokenRepositoryMock() {
    return {
        create: vi.fn(),
        revoke: vi.fn(),
        revokeAllByUserId: vi.fn()
    };
}
export function makeRefreshTokenQueryRepositoryMock() {
    return {
        findByHash: vi.fn()
    };
}
//# sourceMappingURL=MakeRefreshTokenRepository.js.map