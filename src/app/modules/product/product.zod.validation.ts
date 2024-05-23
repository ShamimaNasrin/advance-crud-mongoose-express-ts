import { z } from "zod";

// Define the Variant schema
const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Define the Inventory schema
const inventoryValidationSchema = z.object({
  quantity: z.number().nonnegative("Quantity must be non-negative"),
  inStock: z.boolean(),
});

// Define the Product schema
const productValidationSchema = z.object({
  name: z.string().trim(),
  description: z.string(),
  price: z.number().nonnegative("price must be non-negative"),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema).nonempty("Variants is required"),
  inventory: inventoryValidationSchema,
});

export { productValidationSchema };
