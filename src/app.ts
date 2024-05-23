import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("server running");
});

// handle invalid  routes
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
