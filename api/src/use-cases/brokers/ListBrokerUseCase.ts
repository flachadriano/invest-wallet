import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';

interface IRequest {
  user: User;
}

export class ListBrokerUseCase {
  constructor(private repository: IBrokerRepository) {}

  execute({ user }: IRequest): Promise<Broker[]> {
    return this.repository.all(user);
  }
}
