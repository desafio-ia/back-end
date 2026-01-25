export type JwtPayload = {
    userId: string;
    [key: string]: any;
};

export interface JwtProviderPort {
    generateAccessToken(payload: JwtPayload): Promise<string>;
    generateRefreshToken(payload: JwtPayload): Promise<string>;
    verifyAccessToken(token: string): Promise<boolean>;
    verifyRefreshToken(token: string): Promise<boolean>;
    decodeToken(token: string): JwtPayload | null; 
}