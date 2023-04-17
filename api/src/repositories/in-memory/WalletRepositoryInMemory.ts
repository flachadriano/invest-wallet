import { Wallet } from '../../entities/Wallet';
import { User } from '../../entities/User';
import { IWalletCreateData, IWalletRepository, IWalletUpdateData } from '../interfaces/IWalletRepository';

export class WalletRepositoryInMemory implements IWalletRepository {
  private nextId = 1;
  private wallets: Wallet[] = [];

  create(data: IWalletCreateData): Promise<Wallet> {
    const record = new Wallet();
    record.id = this.nextId;
    record.user = data.user;
    record.name = data.name;
    this.wallets.push(record);
    this.nextId += 1;
    return Promise.resolve(record);
  }

  all(user: User): Promise<Wallet[]> {
    return Promise.resolve(this.wallets.filter(b => b.user.id === user.id));
  }

  get(user: User, id: number): Promise<Wallet> {
    const index = this.wallets.findIndex(b => b.user.id === user.id && b.id === id);
    if (index >= 0) {
      return Promise.resolve(this.wallets[index]);
    }
    return Promise.resolve(null);
  }

  update(user: User, id: number, WalletData: IWalletUpdateData): Promise<Wallet> {
    const index = this.wallets.findIndex(b => b.user.id === user.id && b.id === id);
    if (index >= 0) {
      const wallet = this.wallets[index];
      wallet.name = WalletData.name;
      this.wallets[index] = wallet;
      return Promise.resolve(wallet);
    }
    return Promise.reject();
  }

  delete(user: User, id: number): Promise<boolean> {
    const index = this.wallets.findIndex(b => b.user.id === user.id && b.id === id);
    delete this.wallets[index];
    return Promise.resolve(true);
  }
}
