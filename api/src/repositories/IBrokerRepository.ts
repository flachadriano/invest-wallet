import { Broker } from '../entities/Broker';
import { User } from '../entities/User';

export interface IBrokerCreateData {
  user: User;
  acronym: string;
  name: string;
  cnpj: string;
}

export interface IBrokerUpdateData {
  acronym: string;
  name: string;
  cnpj: string;
}

export interface IBrokerRepository {

  create(brokerData: IBrokerCreateData): Promise<Broker>;

  all(user: User): Promise<Broker[]>;

  get(user: User, id: number): Promise<Broker>;

  update(user: User, id: number, brokerData: IBrokerUpdateData): Promise<Broker>;

  delete(user: User, id: number): Promise<boolean>;
}
