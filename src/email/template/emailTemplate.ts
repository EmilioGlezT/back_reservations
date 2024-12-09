import { BookingEmailData } from "../job/emailJob";

export function generateBookingEmailTemplate(
    data: BookingEmailData) : string {
    const mapImageURL = generateMapboxStaticImageURL(data.lat, data.lng);
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalles de la reservacion</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007BFF;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 10px 0;
            }
            .footer {
                background-color: #f4f4f4;
                color: #777;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Detalles de la reservacion</h1>
            </div>
            <div class="content">
                <p><strong>Nombre de la propiedad d:</strong> ${data.propertyName}</p>
                <p><strong>Numero de guests:</strong> ${data.guests}</p>
                <p><strong>Fecha de inicio :</strong> ${data.startDate}</p>
                <p><strong>Fecha de termino :</strong> ${data.endDate}</p>
                <p><strong>Latitud:</strong> ${data.lat}</p>
                <p><strong>Longitud:</strong> ${data.lng}</p>
                <p><strong>Total:</strong> ${data.totalAmount}</p>
                <img src="${mapImageURL}" alt="Mapa del Incidente" style="display: block; margin: 10px auto;">
            </div>
            <div class="footer">
                <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: string, lng: string): string => {
    const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
    const zoom = 13;
    const width = 800;
    const height = 500;
        return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}