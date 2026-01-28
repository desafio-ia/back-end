import { randomUUID } from 'node:crypto';

export interface ClassificationProps {
  userId: string;
  nameSpecies: string;
  modelId: string;
  confidence: number;
  classifiedAt?: Date; 
}

export class Classification {
  private readonly _id: string;
  private props: ClassificationProps;

  private constructor(props: ClassificationProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      classifiedAt: props.classifiedAt ?? new Date(),
    };

    this.validate();
  }

  public static create(props: ClassificationProps): Classification {
    const instance = new Classification(props);
    return instance;
  }

  public static restore(id: string, props: ClassificationProps): Classification {
    return new Classification(props, id);
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get nameSpecies(): string {
    return this.props.nameSpecies;
  }

  public get modelId(): string {
    return this.props.modelId;
  }

  public get confidence(): number {
    return this.props.confidence;
  }

  public get classifiedAt(): Date {
    return this.props.classifiedAt!;
  }

  private validate() {
    if (this.props.confidence < 0 || this.props.confidence > 100) {
      throw new Error('A confiança deve estar entre 0 e 100 (ou 0 e 1 dependendo da sua regra).');
    }

    if (!this.props.nameSpecies || this.props.nameSpecies.trim().length === 0) {
      throw new Error('O nome da espécie é obrigatório.');
    }
  }

  public getFormattedConfidence(): string {
    return `${this.props.confidence.toFixed(2)}%`;
  }
}