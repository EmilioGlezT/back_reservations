import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserJwtPayload extends JwtPayload {
  role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ message: 'Acceso denegado' });
    return;
  }

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err || !user || typeof user === 'string') {
      res.status(403).json({ message: 'Token no válido' });
      return;
    }

    req.body.userId = (user as UserJwtPayload).id; 
  });
};
