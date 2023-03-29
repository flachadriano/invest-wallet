import { User } from '../../entities/User';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { NotFound } from '../errors/NotFound';

export class DeleteAssetUseCase {
  constructor(private repository: IAssetRepository) {}

  async execute(user: User, id: number): Promise<boolean> {
    const asset = await this.repository.get(user, id);
    if (!asset) {
      throw new NotFound('Ativo');
    }

    return this.repository.delete(user, id);
  }
}
