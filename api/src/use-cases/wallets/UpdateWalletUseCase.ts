import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  name: string;
}

export class UpdateWalletUseCase {
  constructor(private repository: IWalletRepository) {}

  async execute(user: User, id: number, { name }: IRequest): Promise<Wallet> {
    if (!name) {
      throw new UnprocessableEntity('Nome');
    }

    const wallet = await this.repository.get(user, id);
    if (!wallet) {
      throw new NotFound('Carteira');
    }

    return this.repository.update(user, id, { name });
  }
}
