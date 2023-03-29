import Wallet from '../entities/Wallet';
import api from './Api';

interface Payload {
  name: string;
}

export async function getWalletList(): Promise<Wallet[]> {
  const { data } = await api.get('/wallets');
  return data;
}

export async function getWallet(id: number): Promise<Wallet> {
  const { data } = await api.get(`/wallets/${id}`);
  return data;
}

export async function postWallet(payload: Payload): Promise<Wallet> {
  const { data } = await api.post('/wallets', payload);
  return data;
}

export async function putWallet(id: number, payload: Payload): Promise<Wallet> {
  const { data } = await api.put(`/wallets/${id}`, payload);
  return data;
}

export async function deleteWallet(id: number): Promise<boolean> {
  const { data } = await api.delete(`/wallets/${id}`);
  return data;
}
