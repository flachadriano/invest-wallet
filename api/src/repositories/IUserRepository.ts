import { User } from "../entities/User";

interface IUser {
  name: string;
  email: string;
  login: string;
  password: string;
}

export interface IUserRepository {

  create(user: IUser): User;

  save(user: User): Promise<User>;

}
