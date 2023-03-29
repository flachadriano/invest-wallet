import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  user: User;
  name: string;
}

export class CreateWalletUseCase {
  constructor(private repository: IWalletRepository) {}

  async execute({ user, name }: IRequest): Promise<Wallet> {
    if (!name) {
      throw new UnprocessableEntity('Nome');
    }

    return this.repository.create({ user, name });
  }
}
