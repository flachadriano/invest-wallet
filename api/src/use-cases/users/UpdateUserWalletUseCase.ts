import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  selectedWalletId: number;
}

export class UpdateUserWalletUseCase {
  constructor(
    private repository: IUserRepository,
    private walletRepo: IWalletRepository
  ) {}

  async execute(user: User, { selectedWalletId }: IRequest): Promise<User> {
    if (!selectedWalletId) {
      throw new UnprocessableEntity('Carteira');
    }

    const wallet = await this.walletRepo.get(user, selectedWalletId);
    if (!wallet) {
      throw new NotFound('Wallet');
    }

    const updatedUser = await this.repository.update(user.id, { selectedWalletId });
    return updatedUser;
  }
}
