import {  Request, Response } from 'express';
import { UserModel } from '../../data/models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export class UserController{

    public login = async (req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body;

        try {
          const user = await UserModel.findOne({ email });
          if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) return res.status(403).json({ message: 'Contraseña incorrecta' });
      
          const token = jwt.sign(
            { id: user._id, role: user.role },
            'SECRET_KEY',
            { expiresIn: '1h' }
          );
      
          res.json({ token });
        } catch (err: any) {
           res.status(500).json({ message: err.message });
        }
    }

    public getAllUsers = async (req:Request, res: Response) => {
      try {
        const users = await UserModel.find();
        res.json(users);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    }
    
    public getUserById = async (req: Request, res: Response): Promise<any> => {
      const { id } = req.params;
    
      try {
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    }

    public createUser = async (req: Request, res: Response) => {
      const { name, email, password, phone, role } = req.body;
    
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ name, email, password: hashedPassword, phone, role, createdAt: new Date() });
        await user.save();
        const token = jwt.sign(
          { id: user._id, role: user.role },
          'SECRET_KEY',
          { expiresIn: '1h' }
        );
        res.json(token);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    }
    // update user
    public updateUser = async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, email, password, phone, role } = req.body;
    
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.findByIdAndUpdate(
          id,
          { name, email, password: hashedPassword, phone, role },
          { new: true }
        );
        res.json(user);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    }
    

    public authenticateToken = (req: Request, res: Response, next: any) => {
      const token = req.header('Authorization');
      if (!token) return res.status(401).json({ message: 'Acceso denegado' });
    
      jwt.verify(token, 'SECRET_KEY',
        (err: any, user: any) => {
          if (err) return res.status(403).json({ message: 'Token no válido' });
          req.body.role = user.role;
          next();
        });
    }
}