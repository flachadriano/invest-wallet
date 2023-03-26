import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { IBrokerRepository } from '../../repositories/IBrokerRepository';
import { NotFound } from '../errors/NotFound';

export class GetBrokerUseCase {
  constructor(private repository: IBrokerRepository) {}

  async execute(user: User, id: number): Promise<Broker> {
    const broker = await this.repository.get(user, id);
    if (!broker) {
      throw new NotFound('Corretora');
    }

    return broker;
  }
}
