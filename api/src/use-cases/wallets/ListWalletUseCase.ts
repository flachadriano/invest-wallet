import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';

interface IRequest {
  user: User;
}

export class ListWalletUseCase {
  constructor(private repository: IWalletRepository) {}

  execute({ user }: IRequest): Promise<Wallet[]> {
    return this.repository.all(user);
  }
}
