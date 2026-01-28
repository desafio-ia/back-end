import swaggerSpec from './swagger-spec';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import { userRoutes } from '../modules/user/interface/user.route';
import { authRoutes } from 'modules/auth/interface/auth.routes';
import { ensureAuthenticated } from '@shared/middleware/ensureAuthenticated';
import { classificationRoutes } from 'modules/classification/interface/classification.route';

export default async function buildApp() {
  const app = express();
  app.use(express.json())

  app.use('/classification', [ensureAuthenticated], classificationRoutes)
  app.use('/user', [ensureAuthenticated], userRoutes)
  app.use('/auth', authRoutes)
  
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })
  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  return app
}