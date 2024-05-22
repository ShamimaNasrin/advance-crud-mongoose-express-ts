import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// for creating product
router.post("/", ProductController.createProduct);

//get all product
router.get("/", ProductController.getAllProducts);

// get a single product
router.get("/:productId", ProductController.getSingleProduct);

//delete a single product
router.delete("/:productId", ProductController.deleteSingleProduct);

// update a single product
router.put("/:productId", ProductController.updateSingleProduct);

export const ProductRoutes = router;
