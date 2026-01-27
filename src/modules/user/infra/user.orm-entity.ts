import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ unique: true })
  email!: string

  @Column({ name: 'password_hash' })
  passwordHash!: string

  @Column({ name: 'password_reset_token_hash', nullable: true })
  password_reset_token_hash!: string

  @Column({ name: 'password_reset_expires_at', nullable: true })
  password_reset_expires_at!: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}