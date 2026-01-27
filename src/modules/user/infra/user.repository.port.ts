import { User } from "../domain/user.domain"

export interface UserRepository {
  save(user: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByTokenPassword(tokenReset: string): Promise<User | null>
  emailExists(email: string): Promise<boolean>
  update(user: User): Promise<void>
}