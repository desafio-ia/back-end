import { AuthSessionDTO, LoginInputDTO, MeResponseDto, RegisterInputDTO, ResetPasswordInputDTO } from "./auth.dto";

export interface AuthServicePort {
    register(user: RegisterInputDTO): Promise<AuthSessionDTO>;
    login(credentials: LoginInputDTO): Promise<AuthSessionDTO>;
    requestPasswordRecovery(email: string): Promise<void>;
    resetPassword(input: ResetPasswordInputDTO): Promise<void>;
    me(userId: string): Promise<MeResponseDto>;
}   