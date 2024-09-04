// src/models/reservationModel.ts
import { Schema, model } from 'mongoose';

const reservationSchema = new Schema({
    id: { type: Number, required: true },
    checkIn: { type: Date, required: true }, // Date type for check-in date
    checkOut: { type: Date, required: true }, // Date type for check-out date
    price: { type: Number, required: true }, // Number type for price
    created_at: { type: Date, required: true }, // Date type for creation date
    guest_name: { type: String, required: true }, // String type for guest name
    listingId: { type: Number, required: true }, // Number type for listing ID
    status: { type: String, required: true }, // String type for status
    channel_name: { type: String, required: true } // String type for channel name
});

// Create the model using the schema
export const Reservation = model('Reservation', reservationSchema);
