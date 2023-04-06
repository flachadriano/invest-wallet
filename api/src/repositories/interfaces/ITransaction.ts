import { Asset } from '../../entities/Asset';
import { Broker } from '../../entities/Broker';
import { Transaction } from '../../entities/Transaction';
import { Wallet } from '../../entities/Wallet';

export interface ITransactionCreateData {
  wallet: Wallet;
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

  create(transactionData: ITransactionCreateData): Promise<Transaction>;

  all(wallet: Wallet): Promise<Transaction[]>;
}
