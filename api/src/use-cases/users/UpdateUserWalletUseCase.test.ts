import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { createUserFactory, createUserFactoryAnother } from './CreateUserUseCase.factory';
import { UpdateUserWalletUseCase } from './UpdateUserWalletUseCase';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { NotFound } from '../errors/NotFound';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

describe('WHEN update an user wallet', () => {
  let useCase: UpdateUserWalletUseCase;
  let userRepo: IUserRepository;
  let user: User;
  let walletRepo: IWalletRepository;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    walletRepo = new WalletRepositoryInMemory();
    user = await createUserFactory(userRepo);
    useCase = new UpdateUserWalletUseCase(userRepo, walletRepo);
  });

  it('WITH valid data THEN update the user', async () => {
    const wallet = await createWalletFactory(walletRepo, user);
    const updatedUser = await useCase.execute(user, { selectedWalletId: wallet.id });
    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.selectedWalletId).toBe(wallet.id);
  });

  it('WITH an invalid invest wallet THEN update the user', async () => {
    const updatedUserPromise = useCase.execute(user, { selectedWalletId: 999999 });
    expect(updatedUserPromise).rejects.toThrow(NotFound);
  });

  it('WITH invest wallet of another user THEN update the user', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const wallet = await createWalletFactory(walletRepo, anotherUser);
    const updatedUserPromise = useCase.execute(user, { selectedWalletId: wallet.id });
    expect(updatedUserPromise).rejects.toThrow(NotFound);
  });
});
