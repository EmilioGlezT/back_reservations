import {Router  } from 'express';
import { UserController } from './controller';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './middleware/authenticateToken';


export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const userController = new UserController();
        router.post('/login',  userController.login);
        router.get('/users' ,authenticateToken,  userController.getAllUsers);
        router.get('/users/:id',authenticateToken, userController.getUserById);
        router.post('/users' , userController.createUser);
        router.put('/users/:id',authenticateToken, userController.updateUser);
        return router;
    }
   


   
}