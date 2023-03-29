import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';
import { IAssetCreateData, IAssetRepository, IAssetUpdateData } from '../interfaces/IAsset';

export class AssetRepositoryInMemory implements IAssetRepository {
  private nextId = 1;
  private assets: Asset[] = [];

  create(assetData: IAssetCreateData): Promise<Asset> {
    const newAsset = new Asset();
    newAsset.id = this.nextId;
    newAsset.user = assetData.user;
    newAsset.name = assetData.name;
    newAsset.category = assetData.category;
    newAsset.subcategory = assetData.subcategory;
    newAsset.legalName = assetData.legalName;
    newAsset.cnpj = assetData.cnpj;
    this.nextId += 1;
    this.assets.push(newAsset);
    return Promise.resolve(newAsset);
  }

  all(user: User): Promise<Asset[]> {
    return Promise.resolve(this.assets.filter(b => b.user.id === user.id));
  }

  get(user: User, id: number): Promise<Asset> {
    const index = this.assets.findIndex(b => b.user.id === user.id && b.id === id);
    if (index >= 0) {
      return Promise.resolve(this.assets[index]);
    }
    return Promise.resolve(null);
  }

  update(user: User, id: number, assetData: IAssetUpdateData): Promise<Asset> {
    const index = this.assets.findIndex(b => b.user.id === user.id && b.id === id);
    if (index >= 0) {
      const asset = this.assets[index];
      asset.name = assetData.name;
      asset.category = assetData.category;
      asset.subcategory = assetData.subcategory;
      asset.legalName = assetData.legalName;
      asset.cnpj = assetData.cnpj;
      this.assets[index] = asset;
      return Promise.resolve(asset);
    }
    return Promise.reject();
  }

  delete(user: User, id: number): Promise<boolean> {
    const index = this.assets.findIndex(b => b.user.id === user.id && b.id === id);
    delete this.assets[index];
    return Promise.resolve(true);
  }
}
