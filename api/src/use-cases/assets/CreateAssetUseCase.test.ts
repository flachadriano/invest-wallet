import { beforeEach, describe, expect, it } from 'vitest';
import { Asset } from '../../entities/Asset';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { createUserFactory } from '../users/CreateUserUseCase.factory';
import { CreateAssetUseCase } from './CreateAssetUseCase';

describe('WHEN create an asset', () => {
  let useCase: CreateAssetUseCase;
  let data;

  const getNewAssetData = async () => {
    const user = await createUserFactory();
    return {
      user,
      name: 'Asset 1',
      category: undefined,
      subcategory: undefined,
      legalName: undefined,
      cnpj: undefined
    };
  };

  beforeEach(async () => {
    useCase = new CreateAssetUseCase(new AssetRepositoryInMemory());
    data = await getNewAssetData();
  });

  it('WITH the minimum valid data THEN create an asset', async () => {
    const newAsset = await useCase.execute(data);
    expect(newAsset).instanceOf(Asset);
  });

  it('WITH no name THEN should raise an error', async () => {
    expect(() => useCase.execute({ ...data, name: '' })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  describe('WITH CNPJ', () => {
    it('with more than 14 chars THEN should raise an error', async () => {
      expect(() => useCase.execute({ ...data, cnpj: 'XXXXXXXX0001-XX' })).rejects.toBeInstanceOf(UnprocessableEntity);
    });

    it('with less than 14 chars THEN should raise an error', async () => {
      expect(() => useCase.execute({ ...data, cnpj: 'XXXXXXXX0001' })).rejects.toBeInstanceOf(UnprocessableEntity);
    });
  });
});
