import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload, JwtProviderPort } from "./interface/jwt.provider.port";
import * as dotenv from 'dotenv';

dotenv.config();

export class JwtProvider implements JwtProviderPort {
    
    private ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? 'segredo_super_secreto_access';
    private REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? 'segredo_super_secreto_refresh';
    private ACCESS_EXPIRES_IN =  process.env.ACCESS_EXPIRES_IN ?? '15m';
    private REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN ?? '7d';

    constructor(){}
    
    public async generateAccessToken(payload: JwtPayload): Promise<string> {
        const options: SignOptions = { 
            expiresIn: this.ACCESS_EXPIRES_IN as any
        };

        return jwt.sign(payload, this.ACCESS_SECRET, options);
    }

    public async generateRefreshToken(payload: JwtPayload): Promise<string> {
        const options: SignOptions = { 
            expiresIn: this.REFRESH_EXPIRES_IN as any
        };

        return jwt.sign(payload, this.REFRESH_SECRET, options);
    }

    public async verifyAccessToken(token: string): Promise<boolean> {
        try {
            jwt.verify(token, this.ACCESS_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }

    public async verifyRefreshToken(token: string): Promise<boolean> {
        try {
            jwt.verify(token, this.REFRESH_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }

    public decodeToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.decode(token); 
            return decoded as JwtPayload;
        } catch (error) {
            return null;
        }
    }
}