import { Broker } from '../entities/Broker';
import { User } from '../entities/User';
import AppDataSource from '../middlewares/DataSource';
import { IBrokerCreateData, IBrokerRepository, IBrokerUpdateData } from './IBrokerRepository';

export class BrokerRepository implements IBrokerRepository {
  private repository = AppDataSource.getRepository(Broker);

  create(brokerData: IBrokerCreateData): Promise<Broker> {
    return this.repository.save(brokerData);
  }

  all(user: User): Promise<Broker[]> {
    return this.repository.findBy({ user });
  }

  get(user: User, id: number): Promise<Broker> {
    return this.repository.findOneBy({ user, id });
  }

  async update(user: User, id: number, brokerData: IBrokerUpdateData): Promise<Broker> {
    await this.repository.update({ user, id }, brokerData);
    return this.repository.findOneBy({ user, id });
  }

  async delete(user: User, id: number): Promise<boolean> {
    await this.repository.delete({ user, id });
    return true;
  }
}
