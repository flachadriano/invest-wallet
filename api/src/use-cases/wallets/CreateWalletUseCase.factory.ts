import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { createUserFactory } from '../users/CreateUserUseCase.factory';
import { CreateWalletUseCase } from './CreateWalletUseCase';

export const getMockedWalletData = async (user: User) => {
  return {
    user: user || await createUserFactory(),
    name: 'Wallet 1'
  };
};

export const getMockedWalletAnotherData = async (user: User) => {
  return {
    user: user || await createUserFactory(),
    name: 'Wallet 2'
  };
};

export async function createWalletFactory(
  repository?: IWalletRepository,
  user?: User
): Promise<Wallet> {
  const createWalletUseCase = new CreateWalletUseCase(repository || new WalletRepositoryInMemory());
  const data = await getMockedWalletData(user);
  const wallet = await createWalletUseCase.execute(data);
  return wallet;
}

export async function createWalletAnotherFactory(
  repository?: IWalletRepository,
  user?: User
): Promise<Wallet> {
  const createWalletUseCase = new CreateWalletUseCase(repository || new WalletRepositoryInMemory());
  const data = await getMockedWalletData(user);
  const wallet = await createWalletUseCase.execute(data);
  return wallet;
}
