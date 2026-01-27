import { PasswordResetToken } from "../domain/reset-password.vo";
import { User } from "../domain/user.domain"
import { UserOrmEntity } from './user.orm-entity'

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {

    const passwordResetToken = new PasswordResetToken(entity.password_reset_token_hash, entity.password_reset_expires_at);

    return new User({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      passwordHash: entity.passwordHash,
      passwordResetToken: passwordResetToken,
      createdAt: entity.createdAt
    })
  }

  static toPersistence(user: User): UserOrmEntity {

    const userToken = user.getTokenReset() == null ? null : user.getTokenReset()

    const entity = new UserOrmEntity()
    entity.id = user.id
    entity.name = user.getName()
    entity.email = user.getEmail()
    entity.passwordHash = (user as any).passwordHash 
    if(userToken?.getHash() !== undefined) entity.password_reset_token_hash = userToken?.getHash()  
    if(userToken?.getExpiresAt() !== undefined) entity.password_reset_expires_at = userToken?.getExpiresAt()
    entity.createdAt = user.createdAt
    return entity
  }
}
