import { Router } from 'express'
import { UserController } from './user.controller'
import { UserServiceImpl } from '../application/user.service'
import { TypeOrmUserRepository } from '../infra/user.repository'
import { ClassificationRepository } from 'modules/classification/infra/classification.repository'
import { ClassificationService } from 'modules/classification/application/classification.service'
import { TypeOrmModelRepository } from 'modules/AI-model/infra/model.repository'

const router = Router()

const userRepository = new TypeOrmUserRepository()
const modelRepository = new TypeOrmModelRepository()
const userService = new UserServiceImpl(userRepository)
const classificationRepository = new ClassificationRepository();
const classificationService = new ClassificationService(classificationRepository, modelRepository);

const userController = new UserController(userService,classificationService)

router.post('', (req, res) => userController.create(req, res)) 
router.get('/:id', (req, res) => userController.getById(req, res))
router.patch('/:id/name', (req, res) => userController.changeName(req, res))
router.get('/classification/me', (req, res) => userController.getHistory(req, res));

export { router as userRoutes }