import { ITransactionData, ITransactionRepository } from '../interfaces/ITransaction';
import { Transaction } from '../../entities/Transaction';
import { Wallet } from '../../entities/Wallet';

export class TransactionRepositoryInMemory implements ITransactionRepository {
  private nextId = 1;
  private transactions: Transaction[] = [];

  all(wallet: Wallet): Promise<Transaction[]> {
    return Promise.resolve(this.transactions.filter(t => t.wallet.id === wallet.id));
  }

  create(wallet: Wallet, data: ITransactionData): Promise<Transaction> {
    const record = new Transaction();
    record.id = this.nextId;
    record.wallet = wallet;
    record.broker = data.broker;
    record.asset = data.asset;
    record.operation = data.operation;
    record.transactionDate = data.transactionDate;
    record.unitPrice = data.unitPrice;
    record.quantity = data.quantity;
    record.total = data.total;
    record.comment = data.comment;
    this.nextId += 1;
    this.transactions.push(record);
    return Promise.resolve(record);
  }

  get(wallet: Wallet, id: number): Promise<Transaction> {
    const transaction = this.transactions.find(t => t.wallet.id === wallet.id && t.id === id);
    if (transaction) {
      return Promise.resolve(transaction);
    }
    return Promise.resolve(null);
  }

  update(wallet: Wallet, id: number, data: ITransactionData): Promise<Transaction> {
    const index = this.transactions.findIndex(t => t.wallet.id === wallet.id && t.id === id);
    if (index >= 0) {
      const record = this.transactions[index];
      record.broker = data.broker;
      record.asset = data.asset;
      record.operation = data.operation;
      record.transactionDate = data.transactionDate;
      record.unitPrice = data.unitPrice;
      record.quantity = data.quantity;
      record.total = data.total;
      record.comment = data.comment;
      this.transactions[index] = record;
      return Promise.resolve(record);
    }
    return Promise.reject();
  }

  delete(wallet: Wallet, id: number): Promise<void> {
    const index = this.transactions.findIndex(t => t.wallet.id === wallet.id && t.id === id);
    if (index >= 0) {
      delete this.transactions[index];
      return Promise.resolve();
    }
    return Promise.reject();
  }
}
