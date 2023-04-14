import { Transaction } from '../entities/Transaction';
import { Wallet } from '../entities/Wallet';
import AppDataSource from '../middlewares/DataSource';
import { ITransactionData, ITransactionRepository } from './interfaces/ITransaction';

export class TransactionRepository implements ITransactionRepository {
  private repository = AppDataSource.getRepository(Transaction);

  all(wallet: Wallet): Promise<Transaction[]> {
    return this.repository.find({
      relations: { wallet: true, broker: true, asset: true },
      where: { wallet: { id: wallet.id } }
    });
  }

  create(wallet: Wallet, data: ITransactionData): Promise<Transaction> {
    return this.repository.save({ ...data, wallet });
  }

  get(wallet: Wallet, id: number): Promise<Transaction> {
    return this.repository.findOne({
      relations: { wallet: true, broker: true, asset: true },
      where: { wallet: { id: wallet.id }, id }
    });
  }

  async update(wallet: Wallet, id: number, data: ITransactionData): Promise<Transaction> {
    await this.repository.update({ wallet: { id: wallet.id }, id }, data);
    return this.get(wallet, id);
  }
}
