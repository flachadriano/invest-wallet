import { Transaction } from '../../entities/Transaction';
import { Wallet } from '../../entities/Wallet';
import { ITransactionRepository } from '../../repositories/interfaces/ITransaction';

export class ListTransactionUseCase {
  constructor(private repository: ITransactionRepository) {}

  execute(wallet: Wallet): Promise<Transaction[]> {
    return this.repository.all(wallet);
  }
}
