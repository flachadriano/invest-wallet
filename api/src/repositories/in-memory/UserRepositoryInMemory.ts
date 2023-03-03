import { User } from "../../entities/User";
import { IUserRepository, IUserCreateData } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  private nextId = 1;
  private users = [];

  create(user: IUserCreateData): Promise<User> {
    const newUser = new User();
    newUser.id = this.nextId;
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.login = user.login;
    newUser.password = user.password;
    newUser.createdAt = new Date();
    this.users.push(newUser);
    this.nextId += 1;
    return Promise.resolve(newUser);
  }

  findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email == email);
    return Promise.resolve(user);
  }

  findByLogin(login: string): Promise<User> {
    const user = this.users.find(user => user.login == login);
    return Promise.resolve(user);
  }
}
