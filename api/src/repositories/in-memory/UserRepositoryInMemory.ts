import { User } from "../../entities/User";
import { IUserRepository, IUserCreateData } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {

  create(user: IUserCreateData): User {
    const newUser = new User();
    newUser.id = 1;
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.login = user.login;
    newUser.password = user.password;
    newUser.createdAt = new Date();
    return newUser;
  }

  save(user: User): Promise<User> {
    return Promise.resolve(user);
  }

}