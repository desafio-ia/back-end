import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { UserOrmEntity } from 'modules/user/infra/user.orm-entity'

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`)
  }
  return value
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: getEnv('POSTGRES_HOST'),
  port: Number(getEnv('POSTGRES_PORT')),
  username: getEnv('POSTGRES_USER'),
  password: getEnv('POSTGRES_PASSWORD'),
  database: getEnv('POSTGRES_DB'),

  synchronize: true, 

  entities: [
    UserOrmEntity,
  ],
})

export async function connectDatabase(): Promise<void> {
  if (AppDataSource.isInitialized) {
    return
  }

  await AppDataSource.initialize()
  console.log('🐘 PostgreSQL conectado com TypeORM')
}