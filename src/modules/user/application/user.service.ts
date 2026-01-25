import { UserService } from './user.services.port'
import { UserRepository } from '../infra/user.repository.port'
import { User } from '../domain/user.domain'
import { ChangeUserNameInput, ChangeUserPasswordInput, CreateUserInput } from './user.dto'

export class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const emailAlreadyExists = await this.userRepository.emailExists(input.email)

    if (emailAlreadyExists) throw new Error('Email already in use')
      
    const user = new User({
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash
    })

    await this.userRepository.save(user)
    return user
  }

  async changeUserName(input: ChangeUserNameInput): Promise<void> {
    const user = await this.userRepository.findById(input.userId)

    if (!user) {
      throw new Error('User not found')
    }

    user.changeName(input.newName)
    await this.userRepository.update(user)
  }

  async changeUserPassword(input: ChangeUserPasswordInput): Promise<void> {
    const user = await this.userRepository.findById(input.userId)

    if (!user) {
      throw new Error('User not found')
    }
    user.changePassword(input.newPasswordHash)
    await this.userRepository.update(user)
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}