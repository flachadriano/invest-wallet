import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { createAssetAnotherFactory, createAssetFactory } from './CreateAssetUseCase.factory';
import { ListAssetUseCase } from './ListAssetUseCase';

describe('WHEN list the assets', () => {
  let useCase: ListAssetUseCase;
  let userRepo: UserRepositoryInMemory;
  let assetRepo: IAssetRepository;
  let user: User;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    user = await createUserFactory(userRepo);
    assetRepo = new AssetRepositoryInMemory();
    createAssetFactory(assetRepo, user);
    useCase = new ListAssetUseCase(assetRepo);
  });

  it('WITH an asset stored earlier THEN get the asset', async () => {
    const brokers = await useCase.execute({ user });
    expect(brokers.length).toBe(1);
  });

  it('WITH two assets stored earlier from different users THEN get only the user asset', async () => {
    const user2 = await createUserFactoryAnother(userRepo);
    createAssetAnotherFactory(assetRepo, user2);
    const brokers = await useCase.execute({ user });
    expect(brokers.length).toBe(1);
  });
});
