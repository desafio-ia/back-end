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
    accessToken: string
};

export type RefreshOutputDTO = {
    refreshToken: string,
    accessToken: string,
}

export type ValidateResponseDTO = {
    isValid: boolean;
    userId?: string;
};


export type ResetPasswordInputDTO = {
    email: string,
    token: string;
    password: string; 
};

export type TokenPayloadDTO = {
    userId: string;
    email: string;
};
