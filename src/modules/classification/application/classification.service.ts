import { Classification } from "../domain/classification.domain";
import { ClassificationRepositoryPort } from "../infra/classification.repository.port";
import { ClassificationServicePort } from "./classification.service.port";

export class ClassificationService implements ClassificationServicePort {
    
  constructor(
    private readonly repository: ClassificationRepositoryPort
  ) {}

  async classifyImage(data: { userId: string, imageBuffer: Buffer } ): Promise<Classification> {
    //TODO Vincular ao microserviço
    const aiResult = await this.analyzeImage(data.imageBuffer);

    const classification = Classification.create({
      userId: data.userId,
      nameSpecies: aiResult.nameSpecies,
      modelId: aiResult.modelId,
      confidence: aiResult.confidence,
    });

    await this.repository.save(classification);
    return classification;
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

  async analyzeImage(imageBuffer: Buffer): Promise<{nameSpecies: string;confidence: number;modelId:string;}> {

    this.processImageToHex(imageBuffer);

    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      nameSpecies: "Rosa Rugosa",
      confidence: 0.98,
      modelId: "vgg16-plant-v1"
    };
  }

  processImageToHex(imageBuffer: Buffer): void {
    console.log(imageBuffer)
  }
}