import { Transaction } from '../entities/Transaction';
import { Wallet } from '../entities/Wallet';
import AppDataSource from '../middlewares/DataSource';
import { ITransactionCreateData, ITransactionRepository } from './interfaces/ITransaction';

export class TransactionRepository implements ITransactionRepository {
  private repository = AppDataSource.getRepository(Transaction);

  create(data: ITransactionCreateData): Promise<Transaction> {
    return this.repository.save(data);
  }

  all(wallet: Wallet): Promise<Transaction[]> {
    return this.repository.find({
      relations: { wallet: true, broker: true, asset: true },
      where: { wallet: { id: wallet.id } }
    });
  }
}
