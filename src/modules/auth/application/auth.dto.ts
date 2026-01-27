export type RegisterInputDTO = {
    name: string;
    email: string;
    password: string;
};


export type LoginInputDTO = {
    email: string;
    password: string;
};

export type AuthSessionDTO = {
    user: {
        name: string;
        email: string;
    },
    refreshToken: string;
    AcessToken: string
};

export type RefreshOutputDTO = {
    refreshToken: string,
    AcessToken: string,
}

export type ValidateResponseDTO = {
    isValid: boolean;
    userId?: string;
};


export type ResetPasswordInputDTO = {
    email: string,
    token: string;
    newPassword: string; 
};

export type TokenPayloadDTO = {
    userId: string;
    email: string;
};
