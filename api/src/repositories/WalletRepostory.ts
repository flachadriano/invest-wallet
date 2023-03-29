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
    return this.repository.findBy({ user });
  }

  get(user: User, id: number): Promise<Wallet> {
    return this.repository.findOneBy({ user, id });
  }

  async update(user: User, id: number, WalletData: IWalletUpdateData): Promise<Wallet> {
    await this.repository.update({ user, id }, WalletData);
    return this.repository.findOneBy({ user, id });
  }

  async delete(user: User, id: number): Promise<boolean> {
    await this.repository.delete({ user, id });
    return true;
  }
}
