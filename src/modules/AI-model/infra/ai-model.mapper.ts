import { AIModelEntity } from "./ai-model.entity";
import { AIModel } from "../domain/ai-model.domain";

export class AIModelMapper {
  static toDomain(raw: AIModelEntity): AIModel {
    return new AIModel({
      id: raw.id,
      name: raw.name,
      framework: raw.framework,
      trainedAt: new Date(raw.trained_at), 
    });
  }

  static toPersistence(domain: AIModel): AIModelEntity {
    const entity = new AIModelEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.framework = domain.framework;
    entity.trained_at = domain.trainedAt.toISOString();
    return entity;
  }
}