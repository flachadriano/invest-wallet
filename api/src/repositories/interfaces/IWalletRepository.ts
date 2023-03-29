import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';

export interface IWalletCreateData {
  user: User;
  name: string;
}

export interface IWalletUpdateData {
  name: string;
}

export interface IWalletRepository {

  create(walletData: IWalletCreateData): Promise<Wallet>;

  all(user: User): Promise<Wallet[]>;

  get(user: User, id: number): Promise<Wallet>;

  update(user: User, id: number, walletData: IWalletUpdateData): Promise<Wallet>;

  delete(user: User, id: number): Promise<boolean>;
}
