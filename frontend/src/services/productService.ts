import { Product, ProductRequest } from '../types/entities';
import api from './api';

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');
  return data;
};

export const createProduct = async (request: ProductRequest): Promise<Product> => {
  const { data } = await api.post('/products', request);
  return data;
};

export const updateProduct = async (id: number, request: ProductRequest): Promise<Product> => {
  const { data } = await api.put(`/products/${id}`, request);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
