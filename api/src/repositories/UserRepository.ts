import AppDataSource from "../DataSource";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private repository = AppDataSource.getRepository(User);

  create(user: User): User {
    return this.repository.create(user);
  }
  
  save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
