import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { createWalletFactory, getMockedWalletAnotherData } from './CreateWalletUseCase.factory';
import { UpdateWalletUseCase } from './UpdateWalletUseCase';

describe('WHEN update an wallet', () => {
  let useCase: UpdateWalletUseCase;
  let wallet: Wallet;
  let user: User;
  let userRepo: IUserRepository;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    user = await createUserFactory(userRepo);
    const repository = new WalletRepositoryInMemory();
    useCase = new UpdateWalletUseCase(repository);
    wallet = await createWalletFactory(repository);
  });

  it('WITH valid data THEN update the Wallet', async () => {
    const mock = await getMockedWalletAnotherData(user);
    const updatedWallet = await useCase.execute(user, wallet.id, mock);
    expect(updatedWallet).toBeInstanceOf(Wallet);
  });

  it('WITH an user different of the owner WITH valid data THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const mock = await getMockedWalletAnotherData(user);
    const updatedBrokerPromise = useCase.execute(anotherUser, wallet.id, mock);
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(NotFound);
  });

  it('WITH no name THEN should raise an error', async () => {
    const mock = await getMockedWalletAnotherData(user);
    expect(() => useCase.execute(user, wallet.id, { ...mock, name: '' })).rejects.toBeInstanceOf(UnprocessableEntity);
  });
});
