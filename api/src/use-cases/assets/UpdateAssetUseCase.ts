import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  name: string;
  category: string;
  subcategory: string;
  legalName: string;
  cnpj: string;
}

export class UpdateAssetUseCase {
  constructor(private repository: IAssetRepository) {}

  async execute(user: User, id: number, {
    name, legalName, category, subcategory, cnpj
  }: IRequest): Promise<Asset> {
    if (!name) {
      throw new UnprocessableEntity('Nome');
    }

    if (cnpj && cnpj.length !== 14) {
      throw new UnprocessableEntity('CNPJ deve ter exatamente 14 caracteres');
    }

    const asset = await this.repository.get(user, id);
    if (!asset) {
      throw new NotFound('Ativo');
    }

    return this.repository.update(user, id, {
      name, legalName, category: category || 'Geral', subcategory: subcategory || 'Não informado', cnpj
    });
  }
}
