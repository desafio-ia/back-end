import { Repository } from 'typeorm';
import { Classification } from '../domain/classification.domain';
import { ClassificationEntity } from './classification.entity';
import { ClassificationRepositoryPort } from './classification.repository.port';
import { ClassificationMapper } from './classification.mapper';
import { AppDataSource } from '@shared/config/DataSource';

export class ClassificationRepository implements ClassificationRepositoryPort {
  private repository: Repository<ClassificationEntity>

  constructor() {
      this.repository = AppDataSource.getRepository(ClassificationEntity)
    }

  async save(classification: Classification): Promise<void> {
    const persistenceModel = ClassificationMapper.toPersistence(classification);
    await this.repository.save(persistenceModel);
  }

  async findById(id: string): Promise<Classification | null> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    return ClassificationMapper.toDomain(entity);
  }

  async findByUserId(userId: string): Promise<Classification[]> {
    const entities = await this.repository.find({
      where: { userId },
      order: { classifiedAt: 'DESC' }
    });

    return entities.map(ClassificationMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<Classification[]> {
    const entities = await this.repository.find();
    return entities.map(ClassificationMapper.toDomain);
  }
  
}