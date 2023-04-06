import { ITransactionCreateData, ITransactionRepository } from '../interfaces/ITransaction';
import { Transaction } from '../../entities/Transaction';

export class TransactionRepositoryInMemory implements ITransactionRepository {
  private nextId = 1;
  private transactions: Transaction[] = [];

  create(transactionData: ITransactionCreateData): Promise<Transaction> {
    const record = new Transaction();
    record.id = this.nextId;
    record.wallet = transactionData.wallet;
    record.broker = transactionData.broker;
    record.asset = transactionData.asset;
    record.operation = transactionData.operation;
    record.transactionDate = transactionData.transactionDate;
    record.unitPrice = transactionData.unitPrice;
    record.quantity = transactionData.quantity;
    record.total = transactionData.total;
    record.comment = transactionData.comment;
    this.nextId += 1;
    this.transactions.push(record);
    return Promise.resolve(record);
  }
}
