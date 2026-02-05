import { Request, Response } from "express";
import { ClassificationServicePort } from "modules/classification/application/classification.service.port";

type Params = {
  id: string;
};

export class ClassificationController {
  constructor(
    private readonly classificationService: ClassificationServicePort,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      const imageFile = req.file;

      if (!userId) {
        return res.status(400).json({ message: "user id é obrigatória." });
      }

      if (!imageFile) {
        return res.status(400).json({ message: "Imagem é obrigatória." });
      }

      const classification = await this.classificationService.classifyImage({
        userId,
        imageBuffer: imageFile.buffer,
      });

      return res.status(201).json({
        id: classification.id,
        userId: userId,
        species: classification.species,
        confidence: classification.getFormattedConfidence(),
        date: classification.classifiedAt,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request<Params>, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const classification = await this.classificationService.getById(id);

      if (!classification) {
        return res.status(404).json({ message: "Classification not found" });
      }

      return res.json({
        id: classification.id,
        userId: classification.userId,
        species: classification.species,
        modelId: classification.modelId,
        confidence: classification.getFormattedConfidence(),
        classifiedAt: classification.classifiedAt,
      });
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request<Params>, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.classificationService.deleteClassification(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
