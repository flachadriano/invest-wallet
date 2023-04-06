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

  async get(user: User, id: number): Promise<Wallet> {
    const wallets = await this.repository.find({
      relations: { user: true },
      where: { user: { id: user.id }, id }
    });
    return wallets[0];
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
