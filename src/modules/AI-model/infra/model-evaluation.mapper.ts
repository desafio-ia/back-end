import { AIModelEvaluationEntity } from "./model-evaluation.entity";
import { ModelEvaluation } from "../domain/model-evaluation.domain";

export class ModelEvaluationMapper {

  static toDomain(raw: AIModelEvaluationEntity): ModelEvaluation {
    return new ModelEvaluation({
      id: raw.id,
      modelId: raw.model_id,
      datasetName: raw.dataset_name,
      evaluationDate: raw.evaluation_date,
      metrics: {
        accuracy: raw.accuracy,
        precision: raw.precision,
        recall: raw.recall,
        f1_score: raw.f1_score, 
      },
    });
  }


  static toPersistence(domain: ModelEvaluation): AIModelEvaluationEntity {
    const entity = new AIModelEvaluationEntity();

    entity.id = domain.id;
    entity.model_id = domain.modelId;
    entity.dataset_name = domain.datasetName;
    entity.evaluation_date = domain.evaluationDate;
    entity.accuracy = domain.metrics.accuracy;
    entity.precision = domain.metrics.precision;
    entity.recall = domain.metrics.recall;
    entity.f1_score = domain.metrics.f1_score;

    return entity;
  }
}