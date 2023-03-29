import { beforeEach, describe, expect, it } from 'vitest';
import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { createAssetFactory, getMockedAssetAnotherData } from './CreateAssetUseCase.factory';
import { UpdateAssetUseCase } from './UpdateAssetUseCase';

describe('WHEN update an asset', () => {
  let useCase: UpdateAssetUseCase;
  let asset: Asset;
  let user: User;
  let userRepo: IUserRepository;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    user = await createUserFactory(userRepo);
    const repository = new AssetRepositoryInMemory();
    useCase = new UpdateAssetUseCase(repository);
    asset = await createAssetFactory(repository);
  });

  it('WITH valid data THEN update the asset', async () => {
    const mock = await getMockedAssetAnotherData(user);
    const updatedAsset = await useCase.execute(user, asset.id, mock);
    expect(updatedAsset).toBeInstanceOf(Asset);
  });

  it('WITH an user different of the owner WITH valid data THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const mock = await getMockedAssetAnotherData(user);
    const updatedBrokerPromise = useCase.execute(anotherUser, asset.id, mock);
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(NotFound);
  });

  it('WITH no name THEN should raise an error', async () => {
    const mock = await getMockedAssetAnotherData(user);
    expect(() => useCase.execute(user, asset.id, { ...mock, name: '' })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  describe('WITH CNPJ', () => {
    it('with more than 14 chars THEN should raise an error', async () => {
      const mock = await getMockedAssetAnotherData(user);
      expect(() => useCase.execute(user, asset.id, { ...mock, cnpj: 'XXXXXXXX0001-XX' })).rejects.toBeInstanceOf(UnprocessableEntity);
    });

    it('with less than 14 chars THEN should raise an error', async () => {
      const mock = await getMockedAssetAnotherData(user);
      expect(() => useCase.execute(user, asset.id, { ...mock, cnpj: 'XXXXXXXX0001' })).rejects.toBeInstanceOf(UnprocessableEntity);
    });
  });
});
