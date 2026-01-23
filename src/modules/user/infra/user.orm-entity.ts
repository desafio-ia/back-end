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

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}