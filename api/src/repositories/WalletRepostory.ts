import { User } from '../entities/User';
import { Wallet } from '../entities/Wallet';
import AppDataSource from '../middlewares/DataSource';
import { IWalletCreateData, IWalletRepository, IWalletUpdateData } from './interfaces/IWalletRepository';

export class WalletRepository implements IWalletRepository {
  private repository = AppDataSource.getRepository(Wallet);

  create(WalletData: IWalletCreateData): Promise<Wallet> {
    return this.repository.save(WalletData);
  }

  all(user: User): Promise<Wallet[]> {
    return this.repository.find({
      relations: { user: true },
      where: { user: { id: user.id } }
    });
  }

  get(user: User, id: number): Promise<Wallet> {
    return this.repository.findOne({
      relations: { user: true },
      where: { user: { id: user.id }, id }
    });
  }

  async update(user: User, id: number, WalletData: IWalletUpdateData): Promise<Wallet> {
    await this.repository.update({ user, id }, WalletData);
    return this.get(user, id);
  }

  async delete(user: User, id: number): Promise<boolean> {
    await this.repository.delete({ user, id });
    return true;
  }
}
