import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

// create product function
const createProduct = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products
const getAllProduct = async () => {
  const result = await ProductModel.find();
  return result;
};

// get a single product
const getSingleProduct = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

// delete a product
const deleteSingleProduct = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id });
  return result;
};

// update a single product
const updateSingleProduct = async (_id: string, updatedProductD: Product) => {
  const updatedData = await ProductModel.updateOne({ _id }, updatedProductD);
  return updatedData;
};

export const ProductServices = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
