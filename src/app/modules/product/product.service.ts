import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

// create product function
const createProduct = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products
const getAllProduct = async (queryParams: any) => {
  // const result = await ProductModel.find();

  let query: object = {};

  // search query
  if (queryParams?.searchTerm) {
    const search = new RegExp(queryParams.searchTerm, "i");
    query = {
      $or: [
        { name: { $regex: search } },
        { category: { $regex: search } },
        { tags: { $in: [search] } },
      ],
    };
  }

  const result = await ProductModel.find(query);
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
const updateSingleProduct = async (_id: string, updatedProduct: Product) => {
  const result = await ProductModel.updateOne({ _id }, updatedProduct);
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
