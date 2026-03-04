import { RawMaterial, RawMaterialRequest } from '../types/entities';
import api from './api';

export const getRawMaterials = async (): Promise<RawMaterial[]> => {
  const { data } = await api.get('/raw-materials');
  return data;
};

export const createRawMaterial = async (request: RawMaterialRequest): Promise<RawMaterial> => {
  const { data } = await api.post('/raw-materials', request);
  return data;
};

export const updateRawMaterial = async (id: number, request: RawMaterialRequest): Promise<RawMaterial> => {
  const { data } = await api.put(`/raw-materials/${id}`, request);
  return data;
};

export const deleteRawMaterial = async (id: number): Promise<void> => {
  await api.delete(`/raw-materials/${id}`);
};
