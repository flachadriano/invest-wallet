import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { NotFound } from '../errors/NotFound';

export class GetAssetUseCase {
  constructor(private repository: IAssetRepository) {}

  async execute(user: User, id: number): Promise<Asset> {
    const asset = await this.repository.get(user, id);
    if (!asset) {
      throw new NotFound('Ativo');
    }

    return asset;
  }
}
