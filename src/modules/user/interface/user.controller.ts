import { Request, Response } from 'express'
import { UserService } from '../application/user.services.port'

type Params = {
  id: string
}

export class UserController {
  constructor(private readonly userService: UserService){}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body

      const user = await this.userService.createUser({
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash: password
      })

      return res.status(201).json({
        id: user.id,
        name: user.getName(),
        email: user.getEmail()
      })
      
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  async getById(req: Request<Params>, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const user = await this.userService.getUserById(id)

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.json({
        id: user.id,
        name: user.getName(),
        email: user.getEmail()
      })
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async changeName(req: Request<Params>, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { name } = req.body

      await this.userService.changeUserName({
        userId: id,
        newName: name
      })

      const user = res.json({
        id: id,
        name: name
      })

      return res.status(204).send(user)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  async changePassword(req: Request<Params>, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { password } = req.body

      await this.userService.changeUserPassword({
        userId: id,
        newPasswordHash: password 
      })

      return res.status(204).send()
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}