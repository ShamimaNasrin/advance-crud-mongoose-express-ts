import { Schema, model } from "mongoose";
import { Inventory, Product, Variant } from "./product.interface";

const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  value: {
    type: String,
    required: [true, "Value is required"],
  },
});

const InventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "InStock is required"],
  },
});

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  tags: {
    type: [String],
    required: [true, "Description is required"],
  },
  variants: {
    type: [variantSchema],
    required: [true, "Variants is required"],
  },
  inventory: {
    type: InventorySchema,
    required: [true, "Inventory is required"],
  },
});

export const ProductModel = model<Product>("Product", productSchema);
