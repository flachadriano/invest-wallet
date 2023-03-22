import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { IBrokerCreateData, IBrokerRepository, IBrokerUpdateData } from '../IBrokerRepository';

export class BrokerRepositoryInMemory implements IBrokerRepository {
  private nextId = 1;
  private brokers: Broker[] = [];

  create(brokerData: IBrokerCreateData): Promise<Broker> {
    const newBroker = new Broker();
    newBroker.id = this.nextId;
    newBroker.user = brokerData.user;
    newBroker.acronym = brokerData.acronym;
    newBroker.name = brokerData.name;
    newBroker.cnpj = brokerData.cnpj;
    this.nextId += 1;
    this.brokers.push(newBroker);
    return Promise.resolve(newBroker);
  }

  all(user: User): Promise<Broker[]> {
    return Promise.resolve(this.brokers.filter(b => b.user.id === user.id));
  }

  get(user: User, id: number): Promise<Broker> {
    const index = this.brokers.findIndex(b => b.user.id === user.id && b.id === id);
    if (index >= 0) {
      return Promise.resolve(this.brokers[index]);
    }
    return Promise.resolve(null);
  }

  update(user: User, id: number, brokerData: IBrokerUpdateData): Promise<Broker> {
    const index = this.brokers.findIndex(b => b.user.id === user.id && b.id === id);
    if (index >= 0) {
      const broker = this.brokers[index];
      broker.acronym = brokerData.acronym;
      broker.name = brokerData.name;
      broker.cnpj = brokerData.cnpj;
      this.brokers[index] = broker;
      return Promise.resolve(broker);
    }
    return Promise.reject();
  }

  delete(user: User, id: number): Promise<boolean> {
    const index = this.brokers.findIndex(b => b.user.id === user.id && b.id === id);
    delete this.brokers[index];
    return Promise.resolve(true);
  }
}
