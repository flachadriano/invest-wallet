import { beforeEach, describe, expect, test } from 'vitest';
import { DeleteTransactionUseCase } from './DeleteTransactionUseCase';
import { TransactionRepositoryInMemory } from '../../repositories/in-memory/TransactionRepositoryInMemory';
import { createTransactionFactory } from './CreateTransactionUseCase.factory';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { createWalletAnotherFactory, createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { Transaction } from '../../entities/Transaction';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';

describe('WHEN delete a transaction', () => {
  let useCase: DeleteTransactionUseCase;
  let userRepo: IUserRepository;
  let walletRepo: IWalletRepository;
  let user: User;
  let wallet: Wallet;
  let transaction: Transaction;

  beforeEach(async () => {
    const repo = new TransactionRepositoryInMemory();
    userRepo = new UserRepositoryInMemory();
    walletRepo = new WalletRepositoryInMemory();
    user = await createUserFactory(userRepo);
    wallet = await createWalletFactory(walletRepo, user);
    transaction = await createTransactionFactory(user, wallet, repo);
    useCase = new DeleteTransactionUseCase(repo);
  });

  test('WITH a valid id THEN delete the transaction', () => {
    expect(useCase.execute(user, wallet, transaction.id)).resolves.toBeUndefined();
  });

  test('WITH an invalid id THEN raises an error', () => {
    expect(useCase.execute(user, wallet, 999999)).rejects.toBeUndefined();
  });

  test('WITH a valid id of another user THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const anotherWallet = await createWalletAnotherFactory(walletRepo, anotherUser);
    expect(useCase.execute(anotherUser, anotherWallet, transaction.id)).rejects.toBeUndefined();
  });
});
