import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('ai_model_evaluation')
export class AIModelEvaluationEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  model_id!: string;

  @Column({ unique: true })
  dataset_name!: string;

  @Column('float')
  accuracy!: number;

  @Column('float')
  precision!: number;

  @Column('float')
  recall!: number;

  @Column('float')
  f1_score!: number;

  @Column()
  evaluation_date!: Date;
}