import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';

interface IRequest {
  user: User;
}

export class ListAssetUseCase {
  constructor(private repository: IAssetRepository) {}

  execute({ user }: IRequest): Promise<Asset[]> {
    return this.repository.all(user);
  }
}
