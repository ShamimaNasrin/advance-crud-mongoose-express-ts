import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

// for creating order
router.post("/", OrderControllers.createOrder);

//get all order
router.get("/", OrderControllers.getAllOrders);

export const OrderRoutes = router;
