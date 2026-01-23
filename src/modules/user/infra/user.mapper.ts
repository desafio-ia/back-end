import { User } from "../domain/user.domain"
import { UserOrmEntity } from './user.orm-entity'

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      passwordHash: entity.passwordHash,
      createdAt: entity.createdAt
    })
  }

  static toPersistence(user: User): UserOrmEntity {
    const entity = new UserOrmEntity()
    entity.id = user.id
    entity.name = user.getName()
    entity.email = user.getEmail()
    entity.passwordHash = (user as any).passwordHash // ver nota abaixo
    entity.createdAt = user.createdAt
    return entity
  }
}
