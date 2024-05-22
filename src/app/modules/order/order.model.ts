import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

// create schema for order
const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
  },
  productId: {
    type: String,
    required: [true, "ProductId is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});

// create model for order
export const OrderModel = model<Order>("Order", orderSchema);
