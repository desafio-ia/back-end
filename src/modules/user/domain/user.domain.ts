type UserProps = {
  id: string
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
    if (!props.id) {
      throw new Error('User id is required')
    }

    if (!props.name || props.name.trim().length < 3) {
      throw new Error('User name must have at least 3 characters')
    }

    if (!this.isValidEmail(props.email)) {
      throw new Error('Invalid email')
    }

    if (!props.passwordHash || props.passwordHash.length < 60) {
      throw new Error('Invalid password hash')
    }

    this.id = props.id
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
    if (!newPasswordHash || newPasswordHash.length < 60) {
      throw new Error('Invalid password hash')
    }

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

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
