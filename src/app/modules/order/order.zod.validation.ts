import { z } from "zod";

// Define the Order schema
const orderValidationSchema = z.object({
  email: z.string().email("Invalid email format").trim(),
  productId: z.string(),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().positive("Quantity must be a positive number"),
});

export { orderValidationSchema };
