import Transaction from '../entities/Transaction';
import api from './Api';

interface Payload {
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

export async function postTransaction(payload: Payload): Promise<Transaction> {
  const { data } = await api.post('/transactions', payload);
  return data;
}

export async function getTransactionList(walletId: number): Promise<Transaction[]> {
  const { data } = await api.get(`/wallets/${walletId}/transactions`);
  return data;
}
