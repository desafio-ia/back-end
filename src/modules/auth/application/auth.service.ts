import {AuthSessionDTO, LoginInputDTO, RefreshOutputDTO, RegisterInputDTO, ResetPasswordInputDTO } from "./auth.dto";
import { AuthServicePort } from "./auth.service.port";
import { AuthConfig } from "../domain/AuthConfig";
import { UserService } from "modules/user/application/user.services.port";
import { BcryptProviderPort } from "@shared/providers/interface/bcrypt.provider.port";
import { JwtProviderPort } from "@shared/providers/interface/jwt.provider.port";
import { MailProviderPort } from "@shared/providers/interface/mail.provider.port";
import { generateNumericToken } from "@shared/utils/generate-numeric-token";

export class AuthService implements AuthServicePort {

    constructor(
        private readonly userService: UserService, 
        private readonly bcryptProvider: BcryptProviderPort,
        private readonly jwtProvider: JwtProviderPort,
        private readonly mailProvider: MailProviderPort,
    ) {}

    public async register(input: RegisterInputDTO): Promise<AuthSessionDTO> {
        const authConfig = new AuthConfig({
            name: input.name,
            email: input.email,
            password: input.password
        });

        const hashedPassword = await this.bcryptProvider.hash(authConfig.password);
        
        try {
            const createdUser = await this.userService.createUser({
                name: authConfig.name,
                email: authConfig.email,
                passwordHash: hashedPassword 
            });


            const refreshToken = await this.jwtProvider.generateRefreshToken({userId: createdUser.id})
            const AccessToken = await this.jwtProvider.generateAccessToken({userId: createdUser.id})

            return {
                user: {
                    name: createdUser.getName(),
                    email: createdUser.getEmail(),
                },
                refreshToken: refreshToken,
                accessToken: AccessToken,
            }
        } catch (error: any) {
            throw new Error(error.message || "Erro ao registrar usuário");
        }
    }

    public async login(credentials: LoginInputDTO): Promise<AuthSessionDTO> {
        const user = await this.userService.findByEmail(credentials.email);
        if (!user) throw new Error('Credenciais inválidas.');

        const isPasswordValid = await this.bcryptProvider.verify(credentials.password, user.getPassword());
        if (!isPasswordValid) throw new Error('Credenciais inválidas.');

        const refreshToken = await this.jwtProvider.generateRefreshToken({userId: user.id})
        const AccessToken = await this.jwtProvider.generateAccessToken({userId: user.id})

       return {
            user: {
                name: user.getName(),
                email: user.getEmail(),
            },
            refreshToken: refreshToken,
            accessToken: AccessToken,
        }
    }

    public async me(userId: string): Promise<AuthSessionDTO> {
        const user = await this.userService.getUserById(userId);
        if (!user) throw new Error('Usuário não encontrado');

        const refreshToken = await this.jwtProvider.generateRefreshToken({userId: user.id})
        const AccessToken = await this.jwtProvider.generateAccessToken({userId: user.id})

        return {
            user: {
                name: user.getName(),
                email: user.getEmail(),
            },
            refreshToken:refreshToken,
            accessToken: AccessToken,
        }
    }

    public async refreshToken(refreshToken: string):Promise<RefreshOutputDTO> {
        const isRefreshToken = this.jwtProvider.verifyRefreshToken(refreshToken);
        if(!isRefreshToken){throw new Error('Token inválido');}
        
        const decode = this.jwtProvider.decodeToken(refreshToken)
        if(!decode){throw new Error('Token inválido')}

        const refresh_Token = await this.jwtProvider.generateRefreshToken({userId:decode.userId})
        const Access_Token = await this.jwtProvider.generateAccessToken({userId: decode.userId})

        return {
            refreshToken: refresh_Token,
            accessToken: Access_Token,
        }
    } 

    public async requestPasswordRecovery(email: string): Promise<void> {
        const user = await this.userService.findByEmail(email);

        if (!user) {throw new Error('Email not found')}

        const token = generateNumericToken(6);
        const tokenHash = await this.bcryptProvider.hash(token);

        user.requestPasswordReset(
            tokenHash,
            new Date(Date.now() + 10 * 60 * 1000)
        );

        await this.userService.updateUser(user);

        await this.mailProvider.send(
            user.getEmail(),
            'Recuperação de senha - Pokédex Unifor',
            `
            <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #374151;">
                <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
                    
                    <div style="background-color: #4f46e5; height: 6px; width: 100%;"></div>
                    
                    <div style="padding: 30px;">
                        <h2 style="margin-top: 0; color: #111827; font-size: 20px; font-weight: bold;">Recuperação de Senha</h2>
                        
                        <p style="margin-bottom: 24px; color: #6b7280; font-size: 16px;">
                            Você solicitou a recuperação de senha. Use o código abaixo para continuar:
                        </p>

                        <div style="background-color: #f3f4f6; border-radius: 6px; padding: 16px; text-align: center; margin-bottom: 24px;">
                            <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #4f46e5;">
                                ${token}
                            </span>
                        </div>

                        <p style="font-size: 14px; color: #9ca3af; margin-top: 30px;">
                            Esse código expira em 10 minutos. Se você não solicitou isso, ignore este email.
                        </p>
                    </div>
                    
                    <div style="background-color: #f9fafb; padding: 15px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
                        &copy; 2024 Sua Empresa. Todos os direitos reservados.
                    </div>
                </div>
            </div>
            `
        );
    }

    public async resetPassword(input: ResetPasswordInputDTO): Promise<void> {
        const user = await this.userService.findByEmail(input.email)
        if(!user){throw new Error('Token inválido');}

        const resetToken = user.getTokenReset();

        if(!resetToken){throw new Error('Token inválido');}
        if(resetToken.isExpired()) {throw new Error('Token inválido');}

        const isTokenEquals =  await this.bcryptProvider.verify(input.token, resetToken.getHash())
        if(!isTokenEquals){throw new Error('Token inválido');}
        
        const newHash = await this.bcryptProvider.hash(input.password);
        user.resetPassword(newHash)
        await this.userService.updateUser(user);
    }
}