import { Request, Response, NextFunction } from 'express';
import { JwtProvider } from '@shared/providers/jwt.provider';

const jwtProvider = new JwtProvider();

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token is missing' });
    const [, token] = authHeader.split(' ');

    if (!token) return res.status(401).json({ error: 'Token format is invalid' });

    try {
        const isValid = await jwtProvider.verifyAccessToken(token);
        if (!isValid)  return res.status(401).json({ error: 'Token invalid or expired' });

        const payload = jwtProvider.decodeToken(token);
        if (!payload || !payload.userId) return res.status(401).json({ error: 'Invalid token payload' });
        
        req.userId = payload.userId;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}