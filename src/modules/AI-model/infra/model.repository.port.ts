import { AIModel } from "../domain/ai-model.domain";
import { ModelEvaluation } from "../domain/model-evaluation.domain";
import { AIModelEntity } from "./ai-model.entity";
import { AIModelEvaluationEntity } from "./model-evaluation.entity";

export interface ModelRepositoryPort {
  save(model: AIModelEntity): Promise<AIModel>;
  findById(id: string): Promise<AIModel | null>;
  findAll(): Promise<AIModel[]>;
  saveEvaluation(evaluation: AIModelEvaluationEntity): Promise<ModelEvaluation>;
  findEvaluationsByModelId(modelId: string): Promise<ModelEvaluation[]>;
}