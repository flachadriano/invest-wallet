import Transaction from '../entities/Transaction';
import apiPrivate from './ApiPrivate';

interface PostPayload {
  walletId: number;
  brokerId: string;
  assetId: string;
  operation: string;
  transactionDate: string;
  unitPrice: string;
  quantity: string;
  total: string;
  comment: string;
}

interface PutPayload {
  brokerId: string;
  assetId: string;
  operation: string;
  transactionDate: string;
  unitPrice: string;
  quantity: string;
  total: string;
  comment: string;
}

export async function getTransactionList(walletId: number): Promise<Transaction[]> {
  const { data } = await apiPrivate().get(`/wallets/${walletId}/transactions`);
  return data;
}

export async function postTransaction(
  walletId: number,
  payload: PostPayload
): Promise<Transaction> {
  const { data } = await apiPrivate().post(`/wallets/${walletId}/transactions`, payload);
  return data;
}

export async function getTransaction(walletId: number, id: number): Promise<Transaction> {
  const { data } = await apiPrivate().get(`/wallets/${walletId}/transactions/${id}`);
  return data;
}

export async function putTransaction(
  walletId: number,
  id: number,
  payload: PutPayload
): Promise<Transaction> {
  const { data } = await apiPrivate().put(`/wallets/${walletId}/transactions/${id}`, payload);
  return data;
}

export async function deleteTransaction(walletId: number, id: number): Promise<void> {
  return apiPrivate().delete(`/wallets/${walletId}/transactions/${id}`);
}
