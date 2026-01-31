export type AIModelProps = {
  id: string;
  name: string;
  framework: string;
  trainedAt: Date;
};

export class AIModel {
  public readonly id: string;
  public name: string;
  public framework: string;
  public trainedAt: Date;

  constructor(props: AIModelProps) {
    this.id = props.id;
    this.name = props.name;
    this.framework = props.framework;
    this.trainedAt = props.trainedAt;

    this.validate();
  }

  private validate() {
    if (!this.name) {
      throw new Error("O nome do modelo não pode ser vazio.");
    }
    if (this.trainedAt > new Date()) {
      throw new Error("A data de treinamento não pode ser no futuro.");
    }
  }

  public changeName(newName: string) {
    if (newName.length < 3) {
      throw new Error("Nome muito curto.");
    }
    this.name = newName;
  }
}