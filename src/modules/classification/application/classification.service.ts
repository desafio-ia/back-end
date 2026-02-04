import axios from "axios";
import { Classification } from "../domain/classification.domain";
import { ClassificationRepositoryPort } from "../infra/classification.repository.port";
import { ClassificationServicePort } from "./classification.service.port";
import FormData from "form-data";
import { v4 as uuidv4 } from 'uuid';
import { ModelRepositoryPort } from "modules/AI-model/infra/model.repository.port";

export class ClassificationService implements ClassificationServicePort {
    
  private URL_MICROSERVICE = "http://127.0.0.1:5000"

  constructor(
    private readonly repository: ClassificationRepositoryPort,
    private readonly repoModel: ModelRepositoryPort,
  ) {}

  async classifyImage(data: { userId: string, imageBuffer: Buffer }): Promise<Classification> {
    const aiResult = await this.analyzeImage(data.imageBuffer);
    console.log(aiResult)

    await this.ensureModelExists(aiResult.modelId);

    const classification = Classification.create({
      userId: data.userId,
      nameSpecies: aiResult.nameSpecies,
      modelId: aiResult.modelId,
      confidence: aiResult.confidence,
    });

    await this.repository.save(classification);
    return classification;
  }

  private async ensureModelExists(modelId: string): Promise<void> {
    const modelInDb = await this.repoModel.findById(modelId);

    if (!modelInDb) {
      const [modelRes, evalRes] = await Promise.all([
        axios.get(`${this.URL_MICROSERVICE}/model`),
        axios.get(`${this.URL_MICROSERVICE}/model/evaluation`)
      ]);

      await this.repoModel.save({ ...modelRes.data });
      
      const evaluationData = {
        id: uuidv4(),
        model_id: modelId,
        dataset_name: evalRes.data.dataset_name,
        accuracy: evalRes.data.metrics.accuracy,
        precision: evalRes.data.metrics.precision,
        recall: evalRes.data.metrics.recall,
        f1_score: evalRes.data.metrics.f1_score,
        evaluation_date: evalRes.data.evaluation_date
      };

      await this.repoModel.saveEvaluation(evaluationData);
    }
  }

  async getById(id: string): Promise<Classification> {
    const classification = await this.repository.findById(id);
    if (!classification) {
      throw new Error('Classificação não encontrada');
    }
    return classification;
  }

  async getUserHistory(userId: string): Promise<Classification[]> {
    return this.repository.findByUserId(userId);
  }

  async deleteClassification(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async analyzeImage(imageBuffer: Buffer): Promise<{nameSpecies: string;confidence: number; modelId: string;}> {
    const formData = new FormData();
    formData.append("image", imageBuffer, { filename: "image.jpg" });

    const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
      headers: formData.getHeaders(),
    });

    return response.data;
  }
}