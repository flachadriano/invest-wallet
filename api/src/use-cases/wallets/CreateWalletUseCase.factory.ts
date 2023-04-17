import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { CreateWalletUseCase } from './CreateWalletUseCase';

export const getMockedWalletData = async (user: User) => ({
  user: user || await createUserFactory(),
  name: 'Wallet 1'
});

export const getMockedWalletAnotherData = async (user: User) => ({
  user: user || await createUserFactoryAnother(),
  name: 'Wallet 2'
});

export async function createWalletFactory(
  repository?: IWalletRepository,
  user?: User
): Promise<Wallet> {
  const createWalletUseCase = new CreateWalletUseCase(repository || new WalletRepositoryInMemory());
  return createWalletUseCase.execute(await getMockedWalletData(user));
}

export async function createWalletAnotherFactory(
  repository?: IWalletRepository,
  user?: User
): Promise<Wallet> {
  const createWalletUseCase = new CreateWalletUseCase(repository || new WalletRepositoryInMemory());
  return createWalletUseCase.execute(await getMockedWalletAnotherData(user));
}
