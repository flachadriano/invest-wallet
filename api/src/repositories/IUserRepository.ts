import { User } from '../entities/User';

export interface IUserCreateData {
  name: string;
  email: string;
  login: string;
  password: string;
}

export interface IUserRepository {

  create(user: IUserCreateData): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByLogin(login: string): Promise<User>;

}
