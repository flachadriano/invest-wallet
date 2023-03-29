import { beforeEach, describe, expect, it } from 'vitest';
import { Asset } from '../../entities/Asset';
import { User } from '../../entities/User';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { createAssetFactory } from '../assets/CreateAssetUseCase.factory';
import { DeleteAssetUseCase } from '../assets/DeleteAssetUseCase';
import { NotFound } from '../errors/NotFound';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';

describe('WHEN delete an asset', () => {
  let useCase: DeleteAssetUseCase;
  let userRepo: IUserRepository;
  let user: User;
  let asset: Asset;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    user = await createUserFactory(userRepo);
    const repository = new AssetRepositoryInMemory();
    asset = await createAssetFactory(repository, user);
    useCase = new DeleteAssetUseCase(repository);
  });

  it('WITH valid id THEN delete true', async () => {
    const isDeletedBroker = await useCase.execute(user, asset.id);
    expect(isDeletedBroker).toBe(true);
  });

  it('WITH invalid id THEN should raises an error', () => {
    expect(() => useCase.execute(user, 999999)).rejects.toBeInstanceOf(NotFound);
  });

  it('WITH valid id of another user THEN delete true', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const deletedAssetPromise = useCase.execute(anotherUser, asset.id);
    expect(deletedAssetPromise).rejects.toBeInstanceOf(NotFound);
  });
});
