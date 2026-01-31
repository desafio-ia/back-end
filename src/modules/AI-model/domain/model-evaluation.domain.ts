export type EvaluationMetrics = {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
};

export type ModelEvaluationProps = {
  id: string;
  modelId: string;
  datasetName: string;
  metrics: EvaluationMetrics;
  evaluationDate: Date;
};

export class ModelEvaluation {
  public readonly id: string;
  public readonly modelId: string;
  public datasetName: string;
  public metrics: EvaluationMetrics;
  public evaluationDate: Date;

  constructor(props: ModelEvaluationProps) {
    this.id = props.id;
    this.modelId = props.modelId;
    this.datasetName = props.datasetName;
    this.metrics = props.metrics;
    this.evaluationDate = props.evaluationDate;

    this.validateMetrics();
  }

  private validateMetrics() {
    const { accuracy, precision, recall, f1_score } = this.metrics;
    const values = [accuracy, precision, recall, f1_score];
    const isInvalid = values.some((val) => val < 0 || val > 1);
    
    if (isInvalid) {
      throw new Error("As métricas de avaliação devem estar entre 0.0 e 1.0");
    }
  }

  public isHighPerformance(threshold: number = 0.9): boolean {
    return this.metrics.f1_score >= threshold;
  }
}