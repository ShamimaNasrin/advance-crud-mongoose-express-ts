import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// create new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    // const result = await ProductServices.createProduct(productData);

    // Zod validation
    const zodParsedData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProduct(zodParsedData);

    // send response
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
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
    // const result = await ProductServices.getAllProduct();
    const queryParams = req.query;
    const result = await ProductServices.getAllProduct(queryParams);

    res.status(200).json({
      success: true,
      message: `${
        queryParams.searchTerm
          ? `Products matching search term '${queryParams.searchTerm}' fetched successfully!`
          : "Products fetched successfully!"
      }`,
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong fetching products!",
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
        message: "Products fetched successfully!",
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

//update a single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;

    // Zod validation
    const zodParsedData = productValidationSchema.parse(updatedProduct);

    //update a single product
    const updateInfo = await ProductServices.updateSingleProduct(
      productId,
      zodParsedData
    );

    if (updateInfo.modifiedCount > 0) {
      const result = await ProductServices.getSingleProduct(productId);
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: result,
      });
    } else if (updateInfo.matchedCount > 0) {
      res.status(200).json({
        success: false,
        message: "Something went wrong while updating product",
        data: updateInfo,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No such product",
        data: "",
      });
    }
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update product!",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
