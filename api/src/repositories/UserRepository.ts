import AppDataSource from '../middlewares/DataSource';
import { User } from '../entities/User';
import { IUserRepository, IUserUpdateData } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private repository = AppDataSource.getRepository(User);

  create(user: User): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async update(id: number, user: IUserUpdateData): Promise<User> {
    await this.repository.update(id, user);
    return this.repository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  findByLogin(login: string): Promise<User> {
    return this.repository.findOneBy({ login });
  }
}
