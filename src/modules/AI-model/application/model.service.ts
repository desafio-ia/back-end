
import { randomUUID } from "crypto"; // ou 'uuid'
import { ModelServicePort } from "./model.service.port";
import { ModelRepositoryPort } from "../infra/model.repository.port";
import { AddEvaluationCommand, CreateModelCommand } from "./mode.dto";
import { AIModel } from "../domain/ai-model.domain";
import { ModelEvaluation } from "../domain/model-evaluation.domain";
import { AIModelMapper } from "../infra/ai-model.mapper";
import { ModelEvaluationMapper } from "../infra/model-evaluation.mapper";

export class ModelService implements ModelServicePort {
  constructor(private readonly modelRepository: ModelRepositoryPort) {}

  async registerModel(command: CreateModelCommand): Promise<AIModel> {
    const newModel = new AIModel({
      id: command.id,
      framework: command.framework,
      trainedAt: command.trainedAt,
    });

    return await this.modelRepository.save(AIModelMapper.toPersistence(newModel));
  }

  async evaluateModel(command: AddEvaluationCommand): Promise<ModelEvaluation> {
    const model = await this.modelRepository.findById(command.modelId);
    if (!model) throw new Error(`Modelo com ID ${command.modelId} não encontrado.`);

    const evaluation = new ModelEvaluation({
      id: randomUUID(),
      modelId: command.modelId,
      datasetName: command.datasetName,
      evaluationDate: command.evaluationDate || new Date(),
      metrics: command.metrics
    });

    await this.modelRepository.saveEvaluation(ModelEvaluationMapper.toPersistence(evaluation));
    return evaluation;
  }

  async getModelById(id: string): Promise<AIModel | null> {
    return await this.modelRepository.findById(id);
  }

  async listEvaluations(modelId: string): Promise<ModelEvaluation[]> {
    return await this.modelRepository.findEvaluationsByModelId(modelId);
  }
}