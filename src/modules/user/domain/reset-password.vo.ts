export class PasswordResetToken {
  constructor(
    private readonly tokenHash: string,
    private readonly expiresAt: Date
  ) {}

  isExpired(): boolean {
    return new Date() > this.expiresAt
  }

  getExpiresAt(): Date {
    return this.expiresAt
  }

  getHash(): string {
    return this.tokenHash
  }
}