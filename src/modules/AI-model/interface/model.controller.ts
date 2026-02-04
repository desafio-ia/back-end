import { Request, Response } from 'express';
import { ModelServicePort } from "../application/model.service.port";

type Params = {
  id: string;
};

export class ModelController {
    
  constructor(private readonly modelService: ModelServicePort) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { id, framework, trainedAt } = req.body;

      if (!id || !framework) {
        return res.status(400).json({ message: 'Nome e framework são obrigatórios.' });
      }

      const model = await this.modelService.registerModel({
        id,
        framework,
        trainedAt: trainedAt ? new Date(trainedAt) : new Date(),
      });

      return res.status(201).json(model);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async evaluate(req: Request, res: Response): Promise<Response> {
    try {
      const { modelId, datasetName, metrics, evaluationDate } = req.body;

      if (!modelId || !datasetName || !metrics) {
        return res.status(400).json({ message: 'Dados de avaliação incompletos.' });
      }
      
      const evaluation = await this.modelService.evaluateModel({
        modelId,
        datasetName,
        metrics,
        evaluationDate: evaluationDate ? new Date(evaluationDate) : new Date(),
      });

      return res.status(201).json(evaluation);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request<Params>, res: Response): Promise<Response> {
        const { id } = req.params;
        const model = await this.modelService.getModelById(id);

        console.log(model)
        if (!model) return res.status(404).json({ message: 'Modelo não encontrado.' });

        return res.json(model);
  }

  async listEvaluations(req: Request<Params>, res: Response): Promise<Response> {
    try {
      const { id } = req.params; // modelId
      const evaluations = await this.modelService.listEvaluations(id);

      return res.json(evaluations);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}