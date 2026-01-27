import { Router } from 'express'
import { AuthController } from './auth.controller'
import { AuthService } from '../application/auth.service'
import { UserServiceImpl } from 'modules/user/application/user.service'
import { TypeOrmUserRepository } from 'modules/user/infra/user.repository'
import { JwtProvider } from '@shared/providers/jwt.provider'
import { BcryptProvider } from '@shared/providers/bcrypt.provider'

import { ensureAuthenticated } from '@shared/middleware/ensureAuthenticated'
import { MailProvider } from '@shared/providers/mail.provider'

const router = Router()

const userRepository = new TypeOrmUserRepository()
const bcryptProvider = new BcryptProvider()
const jwtProvider = new JwtProvider()
const mailProvider = new MailProvider()
const userService = new UserServiceImpl(userRepository)
const authService = new AuthService(userService,bcryptProvider,jwtProvider, mailProvider)
const authController = new AuthController(authService)

router.post('/register', (req, res) => authController.register(req, res))
router.post('/login', (req, res) => authController.login(req, res))
router.post('/refresh', ensureAuthenticated, (req, res) => authController.refreshToken(req, res))
router.post('/forgot-password', (req, res) => authController.requestPasswordRecovery(req, res))
router.post('/change-password', (req, res) => authController.resetPassword(req, res))
router.get('/me', ensureAuthenticated, (req, res) => authController.me(req, res))

export { router as authRoutes }