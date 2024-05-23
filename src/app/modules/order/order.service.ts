/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductModel } from '../product/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrder = async (order: Order) => {
  const { productId: _id, quantity } = order;

  // checking product existence
  const product = await ProductModel.findOne({ _id });
  if (!product) {
    throw new Error('Product not found');
  }

  // checking the quantity
  if (product?.inventory?.quantity < quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  const updatedQuantity = product?.inventory?.quantity - quantity;
  const inStock = updatedQuantity > 0;
  const updateProductData = {
    $set: {
      'inventory.quantity': updatedQuantity,
      'inventory.inStock': inStock,
    },
  };

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    { _id },
    updateProductData,
  );

  if (!updatedProduct) {
    throw new Error('Something went wrong while updating');
  }

  // Create order
  const result = await OrderModel.create(order);
  return result;
};

// get all the orders from db
const getAllOrder = async (queryParams: any) => {
  let query: object = {};

  if (queryParams?.email) {
    query = { email: queryParams?.email };
  }
  const result = await OrderModel.find(query);
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrder,
};
