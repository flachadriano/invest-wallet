import { beforeEach, describe, expect, it } from 'vitest';
import { Wallet } from '../../entities/Wallet';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { createUserFactory } from '../users/CreateUserUseCase.factory';
import { CreateWalletUseCase } from './CreateWalletUseCase';

describe('WHEN create an wallet', () => {
  let useCase: CreateWalletUseCase;
  let data;

  const getNewWalletData = async () => ({
    user: await createUserFactory(),
    name: 'Wallet 1'
  });

  beforeEach(async () => {
    useCase = new CreateWalletUseCase(new WalletRepositoryInMemory());
    data = await getNewWalletData();
  });

  it('WITH the minimum valid data THEN create an Wallet', async () => {
    const newWallet = await useCase.execute(data);
    expect(newWallet).instanceOf(Wallet);
  });

  it('WITH no name THEN should raise an error', async () => {
    expect(() => useCase.execute({ ...data, name: '' })).rejects.toBeInstanceOf(UnprocessableEntity);
  });
});
