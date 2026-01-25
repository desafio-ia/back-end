import {AuthSessionDTO, LoginInputDTO, RefreshOutputDTO, RegisterInputDTO, ResetPasswordInputDTO } from "./auth.dto";
import { AuthServicePort } from "./auth.service.port";
import { AuthConfig } from "../domain/AuthConfig";
import { UserService } from "modules/user/application/user.services.port";
import { BcryptProviderPort } from "@shared/providers/interface/bcrypt.provider.port";
import { JwtProviderPort } from "@shared/providers/interface/jwt.provider.port";

export class AuthService implements AuthServicePort {

    constructor(
        private readonly userService: UserService, 
        private readonly bcryptProvider: BcryptProviderPort,
        private readonly jwtProvider: JwtProviderPort,
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
                AcessToken: AccessToken,
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
            AcessToken: AccessToken,
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
            AcessToken: AccessToken,
        }
    }

    public async refreshToken(userIdActual: string, refreshToken: string):Promise<RefreshOutputDTO> {
        const isRefreshToken = this.jwtProvider.verifyRefreshToken(refreshToken);
        if(!isRefreshToken){throw new Error('Token inválido');}
        
        const decode = this.jwtProvider.decodeToken(refreshToken)
        if(userIdActual !== decode?.userId){throw new Error('Token inválido')}

        const refresh_Token = await this.jwtProvider.generateRefreshToken({userId:decode?.userId})
        const Access_Token = await this.jwtProvider.generateAccessToken({userId: decode?.userId})

        return {
            refreshToken: refresh_Token,
            AcessToken: Access_Token,
        }
    } 

    //TODO Criar lógica de enviar email com token
    public async requestPasswordRecovery(email: string): Promise<void> {

    }

    //TODO Criar lógica para reset password
    public async resetPassword(input: ResetPasswordInputDTO): Promise<void> {
        const newHash = await this.bcryptProvider.hash(input.newPassword);
    }
}