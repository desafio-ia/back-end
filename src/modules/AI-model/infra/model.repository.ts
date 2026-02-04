import { DataSource, Repository } from "typeorm";
import { AIModelEntity } from "./ai-model.entity";
import { AIModelEvaluationEntity } from "./model-evaluation.entity";
import { AppDataSource } from '@shared/config/DataSource'
import { ModelRepositoryPort } from "./model.repository.port";
import { AIModelMapper } from "./ai-model.mapper";
import { AIModel } from "../domain/ai-model.domain";
import { ModelEvaluation } from "../domain/model-evaluation.domain";
import { ModelEvaluationMapper } from "./model-evaluation.mapper";

export class TypeOrmModelRepository implements ModelRepositoryPort {
  
  private modelRepo: Repository<AIModelEntity>;
  private evaluationRepo: Repository<AIModelEvaluationEntity>;

  constructor() {
    this.modelRepo = AppDataSource.getRepository(AIModelEntity);
    this.evaluationRepo = AppDataSource.getRepository(AIModelEvaluationEntity);
  }

  async save(model: AIModelEntity): Promise<AIModel> {
    const create = await this.modelRepo.save(model)
    return AIModelMapper.toDomain(create);
  }

  async findById(id: string): Promise<AIModel | null> {
    const find = await this.modelRepo.findOne({
      where: { id }
    });

    return find ? AIModelMapper.toDomain(find) : null
  }

  async findAll(): Promise<AIModel[]> {
    const find = await this.modelRepo.find();
    return find.map(model => AIModelMapper.toDomain(model))
  }

  async saveEvaluation(evaluation: AIModelEvaluationEntity): Promise<ModelEvaluation> {
    const modelExists = await this.modelRepo.exists({ where: { id: evaluation.model_id } });
    
    if (!modelExists) {
      throw new Error(`AIModel com id ${evaluation.model_id} não encontrado.`);
    }

    const evalutation = await this.evaluationRepo.save(evaluation)
    return ModelEvaluationMapper.toDomain(evalutation);
  }

  async findEvaluationsByModelId(modelId: string): Promise<ModelEvaluation[]> {
    const findEvaluation = await this.evaluationRepo.find({
      where: { model_id: modelId },
      order: { evaluation_date: 'DESC' }
    });
    
    return findEvaluation.map(ev => ModelEvaluationMapper.toDomain(ev))
  }
}