import { User } from '../../entities/User';

export interface IUserCreateData {
  name: string;
  email: string;
  login: string;
  password: string;
}

export interface IUserUpdateData {
  name?: string;
  email?: string;
  login?: string;
  password?: string;
  selectedWalletId?: number;
}

export interface IUserRepository {

  create(userData: IUserCreateData): Promise<User>;

  update(id: number, userData: IUserUpdateData): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByLogin(login: string): Promise<User>;

}
