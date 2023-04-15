import { beforeEach, describe, expect, test } from 'vitest';
import { GetTransactionUseCase } from './GetTransactionUseCase';
import { TransactionRepositoryInMemory } from '../../repositories/in-memory/TransactionRepositoryInMemory';
import { CreateTransactionUseCase } from './CreateTransactionUseCase';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { getNewTransactionData } from './CreateTransactionUseCase.factory';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { createBrokerFactory } from '../brokers/CreateBrokerUseCase.factory';
import { ITransactionRepository } from '../../repositories/interfaces/ITransaction';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { Wallet } from '../../entities/Wallet';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { createWalletAnotherFactory, createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { createAssetFactory } from '../assets/CreateAssetUseCase.factory';
import { User } from '../../entities/User';
import { Transaction } from '../../entities/Transaction';
import { NotFound } from '../errors/NotFound';

describe('WHEN get a transaction', () => {
  let transactionRepo: ITransactionRepository;
  let walletRepo: IWalletRepository;
  let brokerRepo: IBrokerRepository;
  let assetRepo: IAssetRepository;
  let userRepo: IUserRepository;
  let user: User;
  let wallet: Wallet;
  let transaction: Transaction;
  let useCase: GetTransactionUseCase;

  beforeEach(async () => {
    transactionRepo = new TransactionRepositoryInMemory();
    walletRepo = new WalletRepositoryInMemory();
    brokerRepo = new BrokerRepositoryInMemory();
    assetRepo = new AssetRepositoryInMemory();
    userRepo = new UserRepositoryInMemory();
    user = await createUserFactory(userRepo);
    wallet = await createWalletFactory(walletRepo, user);
    const broker = await createBrokerFactory(brokerRepo, user);
    const asset = await createAssetFactory(assetRepo, user);
    transaction = await new CreateTransactionUseCase(transactionRepo, brokerRepo, assetRepo)
      .execute(user, wallet, getNewTransactionData(broker, asset));
    useCase = new GetTransactionUseCase(transactionRepo);
  });

  test('WITH valid id THEN get the transaction', () => {
    expect(useCase.execute(user, wallet, transaction.id)).resolves.toBe(transaction);
  });

  test('WITH invalid id THEN raises an error', () => {
    expect(useCase.execute(user, wallet, 999999)).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH valid id of another wallet THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const anotherWallet = await createWalletAnotherFactory(walletRepo, anotherUser);
    expect(useCase.execute(anotherUser, anotherWallet, transaction.id))
      .rejects.toBeInstanceOf(NotFound);
  });
});
