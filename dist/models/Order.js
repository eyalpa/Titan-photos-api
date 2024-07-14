"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    fullAddress: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    frameColor: { type: String, required: true },
    user: { type: String, required: true }
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
