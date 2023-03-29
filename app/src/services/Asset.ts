import Asset from '../entities/Asset';
import api from './Api';

interface Payload {
  name: string;
  category: string;
  subcategory: string;
  legalName: string;
  cnpj: string;
}

export async function getAssetList(): Promise<Asset[]> {
  const { data } = await api.get('/assets');
  return data;
}

export async function getAsset(id: number): Promise<Asset> {
  const { data } = await api.get(`/assets/${id}`);
  return data;
}

export async function postAsset(payload: Payload): Promise<Asset> {
  const { data } = await api.post('/assets', payload);
  return data;
}

export async function putAsset(id: number, payload: Payload): Promise<Asset> {
  const { data } = await api.put(`/assets/${id}`, payload);
  return data;
}

export async function deleteAsset(id: number): Promise<boolean> {
  const { data } = await api.delete(`/assets/${id}`);
  return data;
}
