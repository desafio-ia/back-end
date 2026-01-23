import swaggerSpec from './swagger-spec';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

// Para criar outras rotas
// import { Router } from 'express'
// const router = Router()

export default async function buildApp() {
  const app = express();
  app.use(express.json())

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })
  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  return app
}