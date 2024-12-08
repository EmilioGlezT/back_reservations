
import {EmailService} from '../service/service';
import { generateBookingEmailTemplate } from '../template/emailTemplate';

export interface BookingEmailData {
    propertyName: string;
    guests: number;
    startDate: string; // Puedes usar `Date` si trabajas con objetos de fecha
    endDate: string;   // Igual aquí
    lat: string;
    lng: string;
    totalAmount: number;
  }
  

export const sendEmail = async (email: string, subject: string, data: BookingEmailData ) => {
    try {

        const message = generateBookingEmailTemplate(data);
        const mailOptions = {
            to: email,
            subject: subject,
            htmlBody: message
        }
        const emailService = new EmailService();
        await emailService.sendEmail(mailOptions);
    } catch (error) {
        console.error(error);
    }
}