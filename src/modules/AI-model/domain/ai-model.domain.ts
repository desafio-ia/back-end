export type AIModelProps = {
  id: string;
  framework: string;
  trainedAt: Date;
};

export class AIModel {
  public id: string;
  public framework: string;
  public trainedAt: Date;

  constructor(props: AIModelProps) {
    this.id = props.id;
    this.framework = props.framework;
    this.trainedAt = props.trainedAt;

    this.validate();
  }

  private validate() {
    if (!this.id) {
      throw new Error("O id do modelo não pode ser vazio.");
    }
    if (this.trainedAt > new Date()) {
      throw new Error("A data de treinamento não pode ser no futuro.");
    }
  }
}