import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { createWalletAnotherFactory, createWalletFactory } from './CreateWalletUseCase.factory';
import { ListWalletUseCase } from './ListWalletUseCase';

describe('WHEN list the wallets', () => {
  let useCase: ListWalletUseCase;
  let userRepo: UserRepositoryInMemory;
  let WalletRepo: IWalletRepository;
  let user: User;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    user = await createUserFactory(userRepo);
    WalletRepo = new WalletRepositoryInMemory();
    createWalletFactory(WalletRepo, user);
    useCase = new ListWalletUseCase(WalletRepo);
  });

  it('WITH an Wallet stored earlier THEN get the Wallet', async () => {
    const wallets = await useCase.execute({ user });
    expect(wallets.length).toBe(1);
  });

  it('WITH two Wallets stored earlier from different users THEN get only the user Wallet', async () => {
    const user2 = await createUserFactoryAnother(userRepo);
    createWalletAnotherFactory(WalletRepo, user2);
    const wallets = await useCase.execute({ user });
    expect(wallets.length).toBe(1);
  });
});
