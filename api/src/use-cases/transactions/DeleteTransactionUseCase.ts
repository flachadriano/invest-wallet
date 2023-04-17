import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { ITransactionRepository } from '../../repositories/interfaces/ITransaction';

export class DeleteTransactionUseCase {
  constructor(private repository: ITransactionRepository) {}

  execute(user: User, wallet: Wallet, id: number): Promise<void> {
    return this.repository.delete(wallet, id);
  }
}
