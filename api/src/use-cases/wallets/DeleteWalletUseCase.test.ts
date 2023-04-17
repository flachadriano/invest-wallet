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

describe('WHEN delete an wallet', () => {
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

  it('WITH a valid id THEN delete the wallet', () => {
    expect(useCase.execute(user, asset.id)).resolves.toBe(true);
  });

  it('WITH an invalid id THEN raises an error', () => {
    expect(useCase.execute(user, 999999)).rejects.toBeInstanceOf(NotFound);
  });

  it('WITH a valid id of another user THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    expect(useCase.execute(anotherUser, asset.id)).rejects.toBeInstanceOf(NotFound);
  });
});
