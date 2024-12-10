import { PropertyModel } from "../../data/models/property.model";
import { Request, Response } from "express";
import mongoose from "mongoose";

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

    public getPropertyById = async (req: Request, res: Response) => {
        try {
            const property = await PropertyModel.findById(req.params.id).populate('host');
            if (!property) {
              res.status(404).json({ message: 'Propiedad no encontrada' });
              return;
            } 
        
            res.json(property);
          } catch (err:any) {
            res.status(500).json({ message: err.message });
          }
    }
    public createProperty = async (req: Request, res: Response) => {
      try {
        const { title, description, address, pricePerNight, latitude, longitude, availability, userId } = req.body;
    
        // Validar rol de anfitrión
        if (req.body?.role !== 'host') {
           res.status(403).json({ message: 'Solo los anfitriones pueden crear propiedades' });
        }
    
        const newProperty = await PropertyModel.create({
          title,
          description,
          address,
          pricePerNight,
          latitude,
          longitude,
          availability,
          host: userId, // ID del anfitrión autenticado
        });
    
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
      } catch (err:any) {
        res.status(400).json({ message: err.message });
      }
    }
    public updateProperty = async (req: Request, res: Response) => {
      try {
        const property = await PropertyModel.findById(req.params.id);
    
        if (!property) {
          res.status(404).json({ message: 'Propiedad no encontrada' });
          return;
        }  
    
        if (property.host.toString() !== req.body.userId) {
          res.status(403).json({ message: 'No tienes permiso para actualizar esta propiedad' });
          return;
        }
    
        const updatedProperty = await PropertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProperty);
      } catch (err:any) {
        res.status(500).json({ message: err.message });
      }
    }

    public deleteProperty = async (req: Request, res: Response) => {
      try {
        const property = await PropertyModel.findById(req.params.id);
    
        if (!property) {
          res.status(404).json({ message: 'Propiedad no encontrada' });
          return;
        } 
    
        if (property.host.toString() !== req.body.userId) {
           res.status(403).json({ message: 'No tienes permiso para eliminar esta propiedad' });
           return;
        }
    
        await PropertyModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Propiedad eliminada' });
      } catch (err:any) {
        res.status(500).json({ message: err.message });
      }
    }

    public getPropertiesByHost = async (req: Request, res: Response) => {
      try {
        const userId = req.params.userId;
        const objectId = new mongoose.Types.ObjectId(userId);
        const properties = await PropertyModel.find({ host: objectId });

        res.json(properties);
      } catch (err:any) {
        res.status(500).json({ message: err.message });
      }
    }
}