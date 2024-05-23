import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// create new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const result = await ProductServices.createProduct(productData);
    // send response
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProduct();

    res.status(200).json({
      success: true,
      message: "Products are retrieved succesfully",
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

// Get a single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProduct(productId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Product is retrieved succesfully",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No such product",
        data: result,
      });
    }
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

// delete a single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProduct(productId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No such product",
        data: result,
      });
    }
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
};
