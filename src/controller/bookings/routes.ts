import {Router} from 'express';
import { BookingsController } from './controller';

export class BookingsRoutes{

    static get routes(): Router{
        const router = Router();
        const bookingsController = new BookingsController();
        router.post("/", bookingsController.createBooking);
        router.get("/", bookingsController.getAllBookings);
        router.get("/:id", bookingsController.getBookingById);
        router.put("/:id", bookingsController.updateBooking);
        router.delete("/:id", bookingsController.deleteBooking);
        router.get("/property/:propertyId", bookingsController.getBookingsByProperty);
        router.get("/user/:userId", bookingsController.getBookingsByUser);
        
        return router;
    }
}