import swaggerSpec from './swagger-spec';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import { userRoutes } from '../modules/user/interface/user.route';
import { authRoutes } from 'modules/auth/interface/auth.routes';
import { ensureAuthenticated } from '@shared/middleware/ensureAuthenticated';
import { classificationRoutes } from 'modules/classification/interface/classification.route';
import { modelRoutes } from 'modules/AI-model/interface/model.routes';
const cors = require('cors')

export default async function buildApp() {
  const app = express();
  app.use(express.json())
  app.use(cors())

  app.use('/models',[ensureAuthenticated], modelRoutes)
  app.use('/classification', [ensureAuthenticated], classificationRoutes)
  app.use('/user', [ensureAuthenticated], userRoutes)
  app.use('/auth', authRoutes)
  
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })
  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  return app
}