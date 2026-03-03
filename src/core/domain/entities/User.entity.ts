import { randomUUID } from "node:crypto"

type UserProps = {
  email: string
  password: string
  passwordResetToken?: string | null
  passwordResetExpiresAt?: Date | null
  passwordChangeAt?: Date | null
  deletedAt?: Date | null
}

export class User {
  private constructor(
    private props: UserProps,
    private id: string
  ) {}

  static create(props: UserProps): User {
    return new User(props, randomUUID())
  }

  static restore(props: UserProps, id: string): User {
    return new User(props, id)
  }

  getId() {
    return this.id
  }

  getEmail() {
    return this.props.email
  }

  getPassword() {
    return this.props.password
  }

  getPasswordChangeAt() {
    return this.props.passwordChangeAt
  }

  getPasswordChangeAtOrThrow(): Date {
    if (!this.props.passwordChangeAt) {
        throw new Error("Password change date not defined")
    }

    return this.props.passwordChangeAt
  }

  getDeletedAt() {
    return this.props.deletedAt
  }

  getDeletedAtOrThrow(): Date {
    if(!this.props.deletedAt) {
        throw new Error("Deleted date not defined")
    }

    return this.props.deletedAt
  }

  getPasswordResetToken() {
    return this.props.passwordResetToken
  }

  getPasswordResetTokenOrThrow(): string {
    if(!this.props.passwordResetToken) {
        throw new Error("Password reset token not defined")
    }

    return this.props.passwordResetToken
  }

  getPasswordResetExpiresAt() {
    return this.props.passwordResetExpiresAt
  }

  getPasswordResetExpiresAtOrThrow() :Date {
    if(!this.props.passwordResetExpiresAt) {
        throw new Error("Password expires date not defined")
    }

    return this.props.passwordResetExpiresAt
  }

  changePassword(newPasswordHash: string) {
    this.props.password = newPasswordHash
    this.clearPasswordResetToken()
    this.markPasswordChanged()
  }

  markPasswordChanged() {
    this.props.passwordChangeAt = new Date()
  }

  setPasswordResetToken(tokenHash: string, expiresAt: Date) {
    this.props.passwordResetToken = tokenHash
    this.props.passwordResetExpiresAt = expiresAt
  }

  clearPasswordResetToken() {
    this.props.passwordResetToken = null
    this.props.passwordResetExpiresAt = null
  }

  isPasswordResetTokenExpired() {
    if (!this.props.passwordResetExpiresAt) return true
    return this.props.passwordResetExpiresAt < new Date()
  }

  softDelete() {
    this.props.deletedAt = new Date()
    this.props.passwordChangeAt = new Date()
  }

  isDeleted() {
    return !!this.props.deletedAt
  }
}