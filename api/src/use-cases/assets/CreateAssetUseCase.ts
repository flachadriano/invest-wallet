import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  user: User;
  name: string;
  category: string;
  subcategory: string;
  legalName: string;
  cnpj: string;
}

export class CreateAssetUseCase {
  constructor(private repository: IAssetRepository) {}

  async execute({ user, name, category, subcategory, legalName, cnpj }: IRequest): Promise<Asset> {
    if (!name) {
      throw new UnprocessableEntity('Nome');
    }

    if (cnpj && cnpj.length !== 14) {
      throw new UnprocessableEntity('CNPJ deve ter exatamente 14 caracteres');
    }

    return this.repository.create({ user, name, category, subcategory, legalName, cnpj });
  }
}
