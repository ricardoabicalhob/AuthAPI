import { vi } from "vitest";
export function makeUserRepositoryMock() {
    return {
        create: vi.fn(),
        softDelete: vi.fn(),
        updatePassword: vi.fn(),
        savePasswordResetToken: vi.fn(),
        clearPasswordResetToken: vi.fn()
    };
}
export function makeUserQueryRepositoryMock() {
    return {
        findById: vi.fn(),
        findByEmail: vi.fn(),
        findByPasswordResetToken: vi.fn(),
        findUserWithPasswordByEmail: vi.fn(),
        findUserWithPasswordById: vi.fn()
    };
}
//# sourceMappingURL=MakeUserRepositories.js.map