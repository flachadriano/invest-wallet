import { User } from '../../entities/User';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { NotFound } from '../errors/NotFound';

export class DeleteBrokerUseCase {
  constructor(private repository: IBrokerRepository) {}

  async execute(user: User, id: number): Promise<boolean> {
    const broker = await this.repository.get(user, id);
    if (!broker) {
      throw new NotFound('Corretora');
    }

    return this.repository.delete(user, id);
  }
}
