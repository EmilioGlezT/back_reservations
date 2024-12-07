import {Router} from 'express';
import {Request, Response} from 'express';
import { PropertyController } from './controller';

export class PropertiesRoutes{

    static get routes(): Router{
        const router = Router();
        const propertyController = new PropertyController();
        router.get("/", propertyController.getProperties);
        router.get("/:id", propertyController.getPropertyById);
        
        return router;
    }
}