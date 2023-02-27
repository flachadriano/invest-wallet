import { User } from "../entities/User";

export interface IUserCreateData {
  name: string;
  email: string;
  login: string;
  password: string;
}

export interface IUserRepository {

  create(user: IUserCreateData): User;

  save(user: User): Promise<User>;

}
