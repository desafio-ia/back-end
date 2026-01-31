export interface CreateModelCommand {
  name: string;
  framework: string;
  trainedAt: Date;
}

export interface AddEvaluationCommand {
  modelId: string;
  datasetName: string;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
  };
  evaluationDate: Date;
}