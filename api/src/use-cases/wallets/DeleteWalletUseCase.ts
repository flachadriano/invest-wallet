import { User } from '../../entities/User';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { NotFound } from '../errors/NotFound';

export class DeleteWalletUseCase {
  constructor(private repository: IWalletRepository) {}

  async execute(user: User, id: number): Promise<boolean> {
    const wallet = await this.repository.get(user, id);
    if (!wallet) {
      throw new NotFound('Ativo');
    }

    return this.repository.delete(user, id);
  }
}
