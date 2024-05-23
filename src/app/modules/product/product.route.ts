import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// for creating product
router.post("/", ProductControllers.createProduct);

//get all product
router.get("/", ProductControllers.getAllProducts);

// get a single product
router.get("/:productId", ProductControllers.getSingleProduct);

//delete a single product
router.delete("/:productId", ProductControllers.deleteSingleProduct);

// update a single product
router.put("/:productId", ProductControllers.updateSingleProduct);

export const ProductRoutes = router;
