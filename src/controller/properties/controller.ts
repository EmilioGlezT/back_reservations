import { PropertyModel } from "../../data/models/property.model";
import { Request, Response } from "express";

export class PropertyController{
    public  getProperties = async (req: Request, res: Response) => {
        try {
            const { minPrice, maxPrice, location } = req.query;
        
            const query: any = {};
        
            if (minPrice && maxPrice) {
              query.pricePerNight = { $gte: Number(minPrice), $lte: Number(maxPrice) };
            }
        
            if (location) {
              query.address = { $regex: location, $options: 'i' }; // Búsqueda por texto
            }
        
            const properties = await PropertyModel.find(query).populate('host');
            res.json(properties);
          } catch (err:any) {
            res.status(500).json({ message: err.message });
          }
    }

    public getPropertyById = async (req: Request, res: Response): Promise<any> => {
        try {
            const property = await PropertyModel.findById(req.params.id).populate('host');
            if (!property) return res.status(404).json({ message: 'Propiedad no encontrada' });
        
            res.json(property);
          } catch (err:any) {
            res.status(500).json({ message: err.message });
          }
    }
    public createProperty = async (req: Request, res: Response) => {
      try {
        const { title, description, address, pricePerNight, latitude, longitude, availability } = req.body;
    
        // Validar rol de anfitrión
        if (req.body?.role !== 'host') {
          return res.status(403).json({ message: 'Solo los anfitriones pueden crear propiedades' });
        }
    
        const newProperty = new PropertyModel({
          title,
          description,
          address,
          pricePerNight,
          latitude,
          longitude,
          availability,
          host: req.user?.id, // ID del anfitrión autenticado
        });
    
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
}