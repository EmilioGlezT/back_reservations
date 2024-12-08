import { Request, Response } from 'express';
import { PropertyModel } from '../../data/models/property.model';
import { BookingModel } from '../../data/models/booking.model';
import { UserModel } from '../../data/models/user.model';
import { sendEmail } from '../../email/job/emailJob';

export class BookingsController{
    public createBooking = async (req: Request, res: Response) => {
        try {
          const { propertyId, userId, startDate, endDate, guests, totalAmount } = req.body;
      
          // Validar la existencia de la propiedad
          const property = await PropertyModel.findById(propertyId);
          if (!property) {
            res.status(404).json({ message: 'La propiedad no existe' });
            return;
          }

          const user = await UserModel.findById(userId); // Asegúrate de importar `UserModel`
          if (!user) {
            res.status(404).json({ message: 'El usuario no existe' });
            return;
          }

          // SENT EMAIL
          await sendEmail(user.email, 'Nueva Reserva', {
            propertyName: property.title,
            guests,
            startDate,
            endDate,
            lat: property.latitude,
            lng: property.longitude,
            totalAmount,
          });
      
          // Crear la reserva
          const booking = new BookingModel({
            property: propertyId,
            user: userId,
            startDate,
            endDate,
            guests,
            totalAmount,
          });
      
          const savedBooking = await booking.save();
          res.status(201).json(savedBooking);
        } catch (err:any ) {
          res.status(400).json({ message: err.message });
        }
    };
    public getAllBookings = async (req: Request, res: Response) => {
        try {
          const { userId, propertyId } = req.query;
      
          const filters: any = {};
          if (userId) filters.user = userId;
          if (propertyId) filters.property = propertyId;
      
          const bookings = await BookingModel.find(filters)
            .populate('property', 'title address')
            .populate('user', 'name email');
      
          res.status(200).json(bookings);
        } catch (err:any) {
          res.status(400).json({ message: err.message });
        }
    };
    public  getBookingById = async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
      
          const booking = await BookingModel.findById(id)
            .populate('property', 'title address')
            .populate('user', 'name email');
      
          if (!booking) {
             res.status(404).json({ message: 'Reserva no encontrada' });
             return;
          }
      
          res.status(200).json(booking);
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    };

    public updateBooking = async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const updates = req.body;
      
          const updatedBooking = await BookingModel.findByIdAndUpdate(id, updates, { new: true });
      
          if (!updatedBooking) {
            res.status(404).json({ message: 'Reserva no encontrada' });
            return;
          }
      
          res.status(200).json(updatedBooking);
        } catch (err:any) {
          res.status(400).json({ message: err.message });
        }
    };
    public deleteBooking = async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
      
          const deletedBooking = await BookingModel.findByIdAndDelete(id);
      
          if (!deletedBooking) {
            res.status(404).json({ message: 'Reserva no encontrada' });
            return;
          }
      
          res.status(200).json({ message: 'Reserva eliminada exitosamente' });
        } catch (err:any) {
          res.status(400).json({ message: err.message });
        }
    };

    public updateBookingStatus = async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const { status } = req.body;
      
          if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
             res.status(400).json({ message: 'Estado inválido' });
             return;
          }
      
          const updatedBooking = await BookingModel.findByIdAndUpdate(id, { status }, { new: true });
      
          if (!updatedBooking) {
            res.status(404).json({ message: 'Reserva no encontrada' });
            return;
          }
      
          res.status(200).json(updatedBooking);
        } catch (err:any) {
          res.status(400).json({ message: err.message });
        }
      };
      
      
      
}