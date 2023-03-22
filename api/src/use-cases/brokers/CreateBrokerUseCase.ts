import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { IBrokerRepository } from '../../repositories/IBrokerRepository';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  user: User;
  acronym: string;
  name: string;
  cnpj: string;
}

export class CreateBrokerUseCase {
  constructor(private repository: IBrokerRepository) {}

  async execute({ user, acronym, name, cnpj }: IRequest): Promise<Broker> {
    if (!acronym) {
      throw new UnprocessableEntity('Nome');
    }
    if (!name) {
      throw new UnprocessableEntity('Razão social');
    }

    if (cnpj && cnpj.length !== 14) {
      throw new UnprocessableEntity('CNPJ deve ter exatamente 14 caracteres');
    }

    return this.repository.create({ user, acronym, name, cnpj });
  }
}
