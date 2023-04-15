import { Transaction } from '../../entities/Transaction';
import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { ITransactionRepository } from '../../repositories/interfaces/ITransaction';
import { NotFound } from '../errors/NotFound';

export class GetTransactionUseCase {
  constructor(private repository: ITransactionRepository) {}

  async execute(user: User, wallet: Wallet, id: number): Promise<Transaction> {
    const transaction = await this.repository.get(wallet, id);
    if (!transaction) {
      throw new NotFound('Transação');
    }
    return transaction;
  }
}
