import { AIModel } from "../domain/ai-model.domain";
import { ModelEvaluation } from "../domain/model-evaluation.domain";
import { AddEvaluationCommand, CreateModelCommand } from "./mode.dto";


export interface ModelServicePort {
  registerModel(command: CreateModelCommand): Promise<AIModel>;
  evaluateModel(command: AddEvaluationCommand): Promise<ModelEvaluation>;
  getModelById(id: string): Promise<AIModel | null>;
  listEvaluations(modelId: string): Promise<ModelEvaluation[]>;
}