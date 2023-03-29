import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { NotFound } from '../errors/NotFound';

export class GetWalletUseCase {
  constructor(private repository: IWalletRepository) {}

  async execute(user: User, id: number): Promise<Wallet> {
    const wallet = await this.repository.get(user, id);
    if (!wallet) {
      throw new NotFound('Carteira');
    }
    return wallet;
  }
}
