import { Router } from 'express';
import { ModelController } from './model.controller';
import { ModelService } from '../application/model.service';
import { TypeOrmModelRepository } from '../infra/model.repository';

const router = Router();

const modelRepository = new TypeOrmModelRepository();
const modelService = new ModelService(modelRepository);
const modelController = new ModelController(modelService);

router.post('/', (req, res) => modelController.register(req, res));
router.get('/:id', (req, res) => modelController.getById(req, res));
router.post('/evaluate', (req, res) => modelController.evaluate(req, res));
router.get('/:id/evaluations', (req, res) => modelController.listEvaluations(req, res));

export { router as modelRoutes };