import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';

export interface IAssetCreateData {
  user: User;
  name: string;
  category: string;
  subcategory: string;
  legalName: string;
  cnpj: string;
}

export interface IAssetUpdateData {
  name: string;
  category: string;
  subcategory: string;
  legalName: string;
  cnpj: string;
}

export interface IAssetRepository {

  create(assetData: IAssetCreateData): Promise<Asset>;

  all(user: User): Promise<Asset[]>;

  get(user: User, id: number): Promise<Asset>;

  update(user: User, id: number, assetData: IAssetUpdateData): Promise<Asset>;

  delete(user: User, id: number): Promise<boolean>;
}
