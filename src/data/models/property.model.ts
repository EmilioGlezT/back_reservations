import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    pricePerNight: { 
        type: Number, 
        required: true 
    },
    host: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', required: true 
    },
    availability: [
        {
          startDate: { type: Date },
          endDate: { type: Date }
        }
      ],
    createdAt: { type: Date, default: Date.now },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
});

export const PropertyModel = mongoose.model('property', propertySchema);