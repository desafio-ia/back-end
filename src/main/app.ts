import swaggerSpec from './swagger-spec';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import { userRoutes } from '../modules/user/interface/user.route';
import { authRoutes } from 'modules/auth/interface/auth.routes';

export default async function buildApp() {
  const app = express();
  app.use(express.json())

  app.use('/user', userRoutes)
  app.use('/auth', authRoutes)
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })
  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  return app
}