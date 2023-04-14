import { Asset } from '../../entities/Asset';
import { Broker } from '../../entities/Broker';
import { Transaction } from '../../entities/Transaction';
import { Wallet } from '../../entities/Wallet';

export interface ITransactionData {
  broker: Broker;
  asset: Asset;
  operation: number;
  transactionDate: Date;
  unitPrice: number;
  quantity: number;
  total: number;
  comment: string;
}

export interface ITransactionRepository {

  all(wallet: Wallet): Promise<Transaction[]>;

  create(wallet: Wallet, data: ITransactionData): Promise<Transaction>;

  get(wallet: Wallet, id: number): Promise<Transaction>;

  update(wallet: Wallet, id: number, data: ITransactionData): Promise<Transaction>;
}
