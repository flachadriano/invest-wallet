import { Transaction } from '../entities/Transaction';
import AppDataSource from '../middlewares/DataSource';
import { ITransactionCreateData, ITransactionRepository } from './interfaces/ITransaction';

export class TransactionRepository implements ITransactionRepository {
  private repository = AppDataSource.getRepository(Transaction);

  create(data: ITransactionCreateData): Promise<Transaction> {
    return this.repository.save(data);
  }
}
