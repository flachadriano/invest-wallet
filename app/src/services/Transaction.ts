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
