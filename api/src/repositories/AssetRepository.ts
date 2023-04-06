import { Asset } from '../entities/Asset';
import { User } from '../entities/User';
import AppDataSource from '../middlewares/DataSource';
import { IAssetCreateData, IAssetRepository, IAssetUpdateData } from './interfaces/IAsset';

export class AssetRepository implements IAssetRepository {
  private repository = AppDataSource.getRepository(Asset);

  create(assetData: IAssetCreateData): Promise<Asset> {
    return this.repository.save(assetData);
  }

  all(user: User): Promise<Asset[]> {
    return this.repository.find({
      relations: { user: true },
      where: { user: { id: user.id } }
    });
  }

  get(user: User, id: number): Promise<Asset> {
    return this.repository.findOne({
      relations: { user: true },
      where: { user: { id: user.id }, id }
    });
  }

  async update(user: User, id: number, assetData: IAssetUpdateData): Promise<Asset> {
    await this.repository.update({ user, id }, assetData);
    return this.get(user, id);
  }

  async delete(user: User, id: number): Promise<boolean> {
    await this.repository.delete({ user, id });
    return true;
  }
}
