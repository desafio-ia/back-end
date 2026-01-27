import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/config/DataSource'
import { UserRepository } from './user.repository.port'
import { User } from '../domain/user.domain'
import { UserOrmEntity } from './user.orm-entity'
import { UserMapper } from './user.mapper'

export class TypeOrmUserRepository implements UserRepository {
  private ormRepository: Repository<UserOrmEntity>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserOrmEntity)
  }

  async save(user: User): Promise<void> {
    const entity = UserMapper.toPersistence(user)
    await this.ormRepository.save(entity)
  }

  async update(user: User): Promise<void> {
    const entity = UserMapper.toPersistence(user)
    await this.ormRepository.save(entity)
  }

  async findByTokenPassword(tokenReset: string): Promise<User | null> {
    const entity = await this.ormRepository.findOneBy({ password_reset_token_hash: tokenReset })
    return entity ? UserMapper.toDomain(entity) : null
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.ormRepository.findOneBy({ id })
    return entity ? UserMapper.toDomain(entity) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.ormRepository.findOneBy({ email })
    return entity ? UserMapper.toDomain(entity) : null
  }

  async emailExists(email: string): Promise<boolean> {
    const count = await this.ormRepository.count({
      where: { email }
    })
    return count > 0
  }
}
