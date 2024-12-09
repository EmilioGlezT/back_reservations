import {Router} from 'express';
import { PropertyController } from './controller';

export class PropertiesRoutes{

    static get routes(): Router{
        const router = Router();
        const propertyController = new PropertyController();
        router.get("/", propertyController.getProperties);
        router.get("/:id", propertyController.getPropertyById);
        router.post("/", propertyController.createProperty);
        router.put("/:id", propertyController.updateProperty);
        router.delete("/:id", propertyController.deleteProperty);
        router.get("/host/:hostId", propertyController.getPropertiesByHost);
        return router;
    }
}