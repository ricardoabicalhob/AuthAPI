export function makePersistedUser(overrides = {}) {
  return {
    id: "user-id",
    name: "User Name",
    email: "user@email.com",
    password: "hashed-password",
    passwordChangeAt: null,
    passwordResetToken: null,
    passwordResetExpiresAt: null,
    deletedAt: null,
    ...overrides
  }
}