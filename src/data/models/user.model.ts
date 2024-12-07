import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'host', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model('user', userSchema);