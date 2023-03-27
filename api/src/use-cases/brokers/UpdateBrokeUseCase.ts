import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { IBrokerRepository } from '../../repositories/IBrokerRepository';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  name: string;
  legalName: string;
  cnpj: string;
}

export class UpdateBrokerUseCase {
  constructor(private repository: IBrokerRepository) {}

  async execute(user: User, id: number, { name, legalName, cnpj }: IRequest): Promise<Broker> {
    if (!name) {
      throw new UnprocessableEntity('Nome');
    }

    if (cnpj && cnpj.length !== 14) {
      throw new UnprocessableEntity('CNPJ deve ter exatamente 14 caracteres');
    }

    const broker = await this.repository.get(user, id);
    if (!broker) {
      throw new NotFound('Corretora');
    }

    return this.repository.update(user, id, { name, legalName, cnpj });
  }
}
