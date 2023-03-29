import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { NotFound } from '../errors/NotFound';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { createWalletFactory } from './CreateWalletUseCase.factory';
import { GetWalletUseCase } from './GetWalletUseCase';

describe('WHEN get an wallet', () => {
  let useCase: GetWalletUseCase;
  let userRepo: IUserRepository;
  let user: User;
  let wallet: Wallet;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    user = await createUserFactory(userRepo);
    const repository = new WalletRepositoryInMemory();
    wallet = await createWalletFactory(repository, user);
    useCase = new GetWalletUseCase(repository);
  });

  it('WITH valid id THEN get the Wallet', async () => {
    const loadedWallet = await useCase.execute(user, wallet.id);
    expect(loadedWallet).toBeInstanceOf(Wallet);
  });

  it('WITH invalid id THEN should raises an error', () => {
    expect(() => useCase.execute(user, 999999)).rejects.toBeInstanceOf(NotFound);
  });

  it('WITH valid id of another user THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const deletedWalletPromise = useCase.execute(anotherUser, wallet.id);
    expect(deletedWalletPromise).rejects.toBeInstanceOf(NotFound);
  });
});
