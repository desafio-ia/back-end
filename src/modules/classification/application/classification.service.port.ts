
import { Classification } from "../domain/classification.domain";

export interface ClassificationServicePort {
  classifyImage(data: { userId: string, imageBuffer: Buffer }): Promise<Classification>;
  getById(id: string): Promise<Classification>;
  getUserHistory(userId: string): Promise<Classification[]>;
  deleteClassification(id: string): Promise<void>;
  analyzeImage(imageBuffer: Buffer): Promise<{    nameSpecies: string;confidence: number; modelId: string;}>;
}