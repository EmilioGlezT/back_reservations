import { Request, Response } from 'express';
import { BookingModel } from '../../data/models/booking.model';

export class BookingController {
  public createBooking = async (req: Request, res: Response): Promise<void> => {
    const { property, startDate, endDate, guests, totalAmount } = req.body;
    const userId = req.body.userId; 

    try {
      const booking = new BookingModel({
        property,
        user: userId,
        startDate,
        endDate,
        guests,
        totalAmount,
      });
      await booking.save();
      res.status(201).json(booking);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  public getUserBookings = async (req: Request, res: Response): Promise<void> => {
    const userId = req.body.userId;

    try {
      const bookings = await BookingModel.find({ user: userId }).populate('property');
      res.json(bookings);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  public updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const booking = await BookingModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!booking) {
        res.status(404).json({ message: 'Reserva no encontrada' });
        return;
      }
      res.json(booking);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  public deleteBooking = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const booking = await BookingModel.findByIdAndDelete(id);
      if (!booking) {
        res.status(404).json({ message: 'Reserva no encontrada' });
        return;
      }
      res.json({ message: 'Reserva eliminada' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}
