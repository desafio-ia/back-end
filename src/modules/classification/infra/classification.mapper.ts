import { Classification } from "../domain/classification.domain";
import { ClassificationEntity } from "./classification.entity";

export class ClassificationMapper {
  static toDomain(entity: ClassificationEntity): Classification {
    return Classification.restore(entity.id, {
      userId: entity.userId,
      nameSpecies: entity.nameSpecies,
      modelId: entity.modelId,
      confidence: Number(entity.confidence),
      classifiedAt: entity.classifiedAt,
    });
  }

  static toPersistence(domain: Classification): ClassificationEntity {
    const entity = new ClassificationEntity();
    entity.id = domain.id;
    entity.userId = domain.userId;
    entity.nameSpecies = domain.nameSpecies;
    entity.modelId = domain.modelId;
    entity.confidence = domain.confidence;
    entity.classifiedAt = domain.classifiedAt;
    return entity;
  }
}