import {Router} from 'express';
import { UserRoutes } from './users/routes';
import { PropertiesRoutes } from './properties/routes';
import { BookingsRoutes } from './bookings/routes';

export class AppRoutes {
    static get routes() : Router{
        const router = Router();
        router.use("/api/user", UserRoutes.routes);
        router.use("/api/properties", PropertiesRoutes.routes);
        router.use("/api/bookings", BookingsRoutes.routes);
        return router
    }
}