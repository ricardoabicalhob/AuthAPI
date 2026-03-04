import { randomUUID } from "node:crypto"

interface RefreshTokenProps {
  userId: string
  tokenHash: string
  expiresAt: Date
  revokedAt?: Date | null
  createdAt?: Date
}

export class RefreshToken {

  private constructor(
    private props: RefreshTokenProps,
    private id: string
  ) {}

  static create(props: RefreshTokenProps) {
    return new RefreshToken(
      {
        ...props,
        revokedAt: null,
        createdAt: new Date()
      },
      randomUUID()
    )
  }

  static restore(props: RefreshTokenProps, id: string) {
    return new RefreshToken(props, id)
  }

  getId() {
    return this.id
  }

  getUserId() {
    return this.props.userId
  }

  getTokenHash() {
    return this.props.tokenHash
  }

  getExpiresAt() {
    return this.props.expiresAt
  }

  getCreatedAt() {
    return this.props.createdAt!
  }

  getRevokedAt() {
    return this.props.revokedAt ?? null
  }

  revoke() {
    if (this.props.revokedAt) return
    this.props.revokedAt = new Date()
  }

  isExpired(): boolean {
    return new Date() > this.props.expiresAt
  }

  isRevoked(): boolean {
    return !!this.props.revokedAt
  }

  isActive(): boolean {
    return !this.isExpired() && !this.isRevoked()
  }
}