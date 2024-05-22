import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

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

export const OrderModel = model<Order>("Order", orderSchema);
