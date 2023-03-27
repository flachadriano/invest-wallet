import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  user: User;
  name: string;
  legalName: string;
  cnpj: string;
}

export class CreateBrokerUseCase {
  constructor(private repository: IBrokerRepository) {}

  async execute({ user, name, legalName, cnpj }: IRequest): Promise<Broker> {
    if (!name) {
      throw new UnprocessableEntity('Nome');
    }

    if (cnpj && cnpj.length !== 14) {
      throw new UnprocessableEntity('CNPJ deve ter exatamente 14 caracteres');
    }

    return this.repository.create({ user, name, legalName, cnpj });
  }
}
