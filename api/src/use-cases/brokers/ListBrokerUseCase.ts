import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';

export class ListBrokerUseCase {
  constructor(private repository: IBrokerRepository) {}

  execute(user: User): Promise<Broker[]> {
    return this.repository.all(user);
  }
}
