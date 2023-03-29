import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { createUserFactory } from '../users/CreateUserUseCase.factory';
import { CreateAssetUseCase } from './CreateAssetUseCase';

export const getMockedAssetData = async (user: User) => {
  return {
    user: user || await createUserFactory(),
    name: 'Asset 1',
    category: undefined,
    subcategory: undefined,
    legalName: undefined,
    cnpj: undefined
  };
};

export const getMockedAssetAnotherData = async (user: User) => {
  return {
    user: user || await createUserFactory(),
    name: 'Asset 2',
    category: undefined,
    subcategory: undefined,
    legalName: undefined,
    cnpj: undefined
  };
};

export async function createAssetFactory(
  repository?: IAssetRepository,
  user?: User
): Promise<Asset> {
  const createAssetUseCase = new CreateAssetUseCase(repository || new AssetRepositoryInMemory());
  const data = await getMockedAssetData(user);
  const asset = await createAssetUseCase.execute(data);
  return asset;
}

export async function createAssetAnotherFactory(
  repository?: IAssetRepository,
  user?: User
): Promise<Asset> {
  const createAssetUseCase = new CreateAssetUseCase(repository || new AssetRepositoryInMemory());
  const data = await getMockedAssetData(user);
  const asset = await createAssetUseCase.execute(data);
  return asset;
}
