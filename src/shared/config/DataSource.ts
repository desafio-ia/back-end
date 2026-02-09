import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserOrmEntity } from "../../modules/user/infra/user.orm-entity";
import * as dotenv from "dotenv";
import { ClassificationEntity } from "modules/classification/infra/classification.entity";
import { AIModelEvaluationEntity } from "modules/AI-model/infra/model-evaluation.entity";
import { AIModelEntity } from "modules/AI-model/infra/ai-model.entity";

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

const useDatabaseUrl = process.env.POSTGRES_DB_URL;

export const AppDataSource = new DataSource(
  useDatabaseUrl
    ? {
        type: "postgres",
        url: useDatabaseUrl,

        ssl: {
          rejectUnauthorized: false,
        },

        synchronize: true,

        entities: [
          UserOrmEntity,
          ClassificationEntity,
          AIModelEntity,
          AIModelEvaluationEntity,
        ],
      }
    : {
        type: "postgres",
        host: getEnv("POSTGRES_HOST"),
        port: Number(getEnv("POSTGRES_PORT")),
        username: getEnv("POSTGRES_USER"),
        password: getEnv("POSTGRES_PASSWORD"),
        database: getEnv("POSTGRES_DB"),

        synchronize: true,

        entities: [
          UserOrmEntity,
          ClassificationEntity,
          AIModelEntity,
          AIModelEvaluationEntity,
        ],
      },
);

export async function connectDatabase(): Promise<void> {
  if (AppDataSource.isInitialized) {
    return;
  }

  await AppDataSource.initialize();
  console.log("🐘 PostgreSQL conectado com TypeORM");
}
