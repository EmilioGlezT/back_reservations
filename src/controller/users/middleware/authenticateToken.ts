import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define el tipo del payload del token que contiene 'role'
interface UserJwtPayload extends JwtPayload {
  role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Obtiene el token de los headers (Authorization)
  const token = req.header('Authorization');
  
  // Si no existe el token, retorna un error 401 (Acceso denegado)
  if (!token) {
    res.status(401).json({ message: 'Acceso denegado' });
    return; // Es importante salir de la función para no continuar con el flujo
  }

  // Verifica si el token es válido
  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err || !user || typeof user === 'string') {
      // Si el token es inválido, retorna un error 403 (Token no válido)
      res.status(403).json({ message: 'Token no válido' });
      return; // Es importante salir de la función para no continuar con el flujo
    }

    // Ahora podemos acceder a 'role' sin errores, ya que sabemos que `user` es de tipo `UserJwtPayload`
    req.body.role = (user as UserJwtPayload).role;

    // Llama al siguiente middleware o controlador
    next();
  });
};
