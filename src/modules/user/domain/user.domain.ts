import { v4 as uuidv4 } from 'uuid';

type UserProps = {
  id?: string
  name: string
  email: string
  passwordHash: string
  createdAt?: Date
}

export class User {
  public readonly id: string
  private name: string
  private email: string
  private passwordHash: string
  public readonly createdAt: Date

  constructor(props: UserProps) {
    if (!props.name || props.name.trim().length < 3) {
      throw new Error('User name must have at least 3 characters')
    }

    if (!this.isValidEmail(props.email)) {
      throw new Error('Invalid email')
    }

    this.id = props.id ?? uuidv4();
    this.name = props.name.trim()
    this.email = props.email.toLowerCase()
    this.passwordHash = props.passwordHash
    this.createdAt = props.createdAt ?? new Date()
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