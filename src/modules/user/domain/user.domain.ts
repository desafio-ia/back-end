import { v4 as uuidv4 } from 'uuid';
import { PasswordResetToken } from './reset-password.vo';

type UserProps = {
  id?: string
  name: string
  email: string
  passwordHash: string
  passwordResetToken?: PasswordResetToken,
  createdAt?: Date
}

export class User {
  public readonly id: string
  private name: string
  private email: string
  private passwordHash: string
  private passwordResetToken?: PasswordResetToken
  public readonly createdAt: Date

  constructor(props: UserProps) {
    if (!props.name || props.name.trim().length < 3) {
      throw new Error('User name must have at least 3 characters')
    }

    if (!this.isValidEmail(props.email)) {
      throw new Error('Invalid email')
    }

    if(props.passwordResetToken){
      this.passwordResetToken = props.passwordResetToken
    }

    this.id = props.id ?? uuidv4();
    this.name = props.name.trim()
    this.email = props.email.toLowerCase()
    this.passwordHash = props.passwordHash
    this.createdAt = props.createdAt ?? new Date()
  }
  
  requestPasswordReset(tokenHash: string, expiresAt: Date) {
    this.passwordResetToken = new PasswordResetToken(tokenHash,expiresAt)
  }

  resetPassword(newPasswordHash: string) {
    if (!this.passwordResetToken) {
      throw new Error('No password reset requested')
    }

    if (this.passwordResetToken.isExpired()) {
      throw new Error('Reset token expired')
    }

    this.passwordHash = newPasswordHash
    this.passwordResetToken = undefined
  }

  changeName(newName: string) {
    if (!newName || newName.trim().length < 3) {
      throw new Error('User name must have at least 3 characters')
    }

    this.name = newName.trim()
  }

  changePassword(newPasswordHash: string) {
    if (newPasswordHash === this.passwordHash) {
      throw new Error('New password must be different from the old one')
    }

    this.passwordHash = newPasswordHash
  }

  getTokenReset(): PasswordResetToken | undefined {
    return this.passwordResetToken
  }

  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  getPassword(): string {
    return this.passwordHash
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}