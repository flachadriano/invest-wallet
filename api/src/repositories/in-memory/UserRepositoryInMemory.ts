import { User } from "../../entities/User";
import { IUserRepository, IUserCreateData } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {

  create(user: IUserCreateData): Promise<User> {
    const newUser = new User();
    newUser.id = 1;
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.login = user.login;
    newUser.password = user.password;
    newUser.createdAt = new Date();
    return Promise.resolve(newUser);
  }

}