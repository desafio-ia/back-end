import { Router } from 'express';
import { ClassificationController } from './classification.controller';
import { ClassificationService } from '../application/classification.service';
import { ClassificationRepository } from '../infra/classification.repository';
import multer from 'multer';
import { TypeOrmModelRepository } from 'modules/AI-model/infra/model.repository';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const modelRepository = new TypeOrmModelRepository();
const classificationRepository = new ClassificationRepository();
const classificationService = new ClassificationService(classificationRepository,modelRepository);
const classificationController = new ClassificationController(classificationService);

router.post('', upload.single('image'), (req, res) => classificationController.create(req, res));
router.get('/:id', (req, res) => classificationController.getById(req, res));
router.delete('/:id', (req, res) => classificationController.delete(req, res));

export { router as classificationRoutes };