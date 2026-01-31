import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('ai_model')
export class AIModelEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  framework!: string;

  @Column()
  trained_at!: string;
}