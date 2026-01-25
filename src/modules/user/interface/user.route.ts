import { Router } from 'express'
import { UserController } from './user.controller'
import { UserServiceImpl } from '../application/user.service'
import { TypeOrmUserRepository } from '../infra/user.repository'
const router = Router()

const userRepository = new TypeOrmUserRepository()
const userService = new UserServiceImpl(userRepository)
const userController = new UserController(userService)

// TODO REMOVER ESSA ROTA, POIS SOMENTE O AUTH SERÁ RESPONSÁVEL POR ELA.
router.post('', (req, res) => userController.create(req, res)) 
router.get('/:id', (req, res) => userController.getById(req, res))
router.patch('/:id/name', (req, res) => userController.changeName(req, res))

export { router as userRoutes }