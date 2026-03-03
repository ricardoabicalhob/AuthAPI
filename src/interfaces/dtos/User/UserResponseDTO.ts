export interface UserResponseDTO {
    id :string
    email :string
    password :string
    passwordResetToken :string | null
    passwordResetExpiresAt :Date | null
    passwordChangeAt :Date | null
    deletedAt :Date | null
}