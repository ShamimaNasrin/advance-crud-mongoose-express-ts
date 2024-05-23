import { Request, Response } from "express";
import { orderValidationSchema } from "./order.zod.validation";
import { OrderServices } from "./order.service";

// Create a order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // zod validation
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrder(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to create a order!",
      error: err,
    });
  }
};

const isEmailFormate = (email: string): boolean => {
  const emailFormateRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormateRegex.test(email);
};

type QueryParams = {
  email?: string;
};

// Get all orders
const getAllOrders = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const queryParams = req.query;

    //email validation
    if (queryParams?.email && !isEmailFormate(queryParams?.email)) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email format",
      });
    }

    const result = await OrderServices.getAllOrder(queryParams);

    const message = queryParams.email
      ? result.length > 0
        ? "Orders fetched successfully for user email!"
        : "No orders found for user email!"
      : result.length > 0
      ? "Orders fetched successfully!"
      : "Orders not found!";

    const status = result?.length > 0 ? 200 : 404;

    if (queryParams.email) {
      if (result.length > 0) {
        return res.status(status).json({
          success: true,
          message,
          data: result,
        });
      } else {
        return res.status(status).json({
          success: false,
          message,
        });
      }
    }

    if (result?.length > 0) {
      return res.status(status).json({
        success: true,
        message,
        data: result,
      });
    } else {
      return res.status(status).json({
        success: false,
        message,
      });
    }
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong fetching orders!",
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
