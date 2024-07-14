import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  fullAddress: { type: String, required: true },
  imageUrls: { type: [String], required: true },
  frameColor: { type: String, required: true },
  user: { type: String, required: true }
});

export const Order = model('Order', orderSchema);
