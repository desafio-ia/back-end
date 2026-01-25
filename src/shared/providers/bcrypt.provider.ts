import { genSalt, hash, compare } from "bcrypt-ts";
import * as dotenv from 'dotenv';
import { BcryptProviderPort } from "./interface/bcrypt.provider.port";

dotenv.config();

export class BcryptProvider implements BcryptProviderPort {
    
    private getEnv(name: string): string {
        const value = process.env[name];
        if (!value) {
            throw new Error(`Environment variable ${name} is not defined`);
        }
        return value;
    }


    public async hash(password: string): Promise<string> {
        const rounds = Number(this.getEnv('BCRYPT_ROUNDS') || 10); 
        const salt = await genSalt(rounds);
        return hash(password, salt);
    }

    public async verify(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return compare(plainTextPassword, hashedPassword);
    }
}