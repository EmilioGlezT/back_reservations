import { Router } from 'express';
import { BookingController } from './controller';
import { authenticateToken } from './middleware/authenticateToken';

export class BookingRoutes {
  static get routes(): Router {
    const router = Router();
    const bookingController = new BookingController();

    router.post('/bookings', authenticateToken, bookingController.createBooking);
    router.get('/bookings', authenticateToken, bookingController.getUserBookings);
    router.patch('/bookings/:id', authenticateToken, bookingController.updateBookingStatus);
    router.delete('/bookings/:id', authenticateToken, bookingController.deleteBooking);

    return router;
  }
}
