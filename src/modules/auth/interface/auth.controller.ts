import { Request, Response } from 'express'; // Ou do seu framework
import { AuthService } from '../application/auth.service';

export class AuthController {

    constructor(private readonly authService: AuthService) {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.me = this.me.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
    }

    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;
            const session = await this.authService.register({ name, email, password });
            return res.status(201).json(session);
        } catch (error: any) {
            return res.status(400).json({ 
                error: 'Registration failed', 
                message: error.message 
            });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const session = await this.authService.login({ email, password });
            return res.status(200).json(session);

        } catch (error: any) {
            const status = error.message === 'Invalid credential' ? 401 : 400;

            return res.status(status).json({ 
                error: 'Login failed', 
                message: error.message 
            });
        }
    }
    
    public async me(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.userId

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const profile = await this.authService.me(userId);

            return res.status(200).json(profile);

        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    public async refreshToken(req: Request, res: Response): Promise<Response> {
        try {
            const { refreshToken } = req.body;
            
            if (!refreshToken) {
                let error_mensage = !refreshToken ? 'Refresh token is required;' : ''
                return res.status(400).json({ error:"Erro:" + error_mensage });
            }  

            const tokens = await this.authService.refreshToken(refreshToken);
            return res.status(200).json(tokens);

        } catch (error: any) {
            return res.status(401).json({ error: error.message });
        }
    }


    public async requestPasswordRecovery(req: Request, res: Response) {
        const { email } = req.body;
        if(!email) {return res.status(400).json({ error:"Email is required"})};

        try {
            await this.authService.requestPasswordRecovery(email);
            return res.status(200).json({ ok: true });
        } catch(error: any) {
            return res.status(200).json({ error: error.message });
        }
    }

    public async resetPassword(req: Request, res: Response) {
        const {email, token, password} = req.body;

        if(!email) {return res.status(400).json({ error:"Email is required"})};
        if(!token) {return res.status(400).json({ error:"token is required"})};
        if(!password) {return res.status(400).json({ error:"Password is required"})};

        try {
            await this.authService.resetPassword({email, token, password});
            return res.status(200).json({ ok: true });
        } catch(error: any) {
            return res.status(200).json({ error: error.message });
        }
    }
}