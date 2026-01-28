import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('classifications')
export class ClassificationEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'name_species' })
  nameSpecies!: string;

  @Column({ name: 'model_id' })
  modelId!: string;

  @Column('decimal', { precision: 5, scale: 2 })
  confidence!: number;

  @CreateDateColumn({ name: 'classified_at' })
  classifiedAt!: Date;
}