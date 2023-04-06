import { beforeEach, describe, expect, test } from 'vitest';
import { ListTransactionUseCase } from './ListTransactionUseCase';
import { TransactionRepositoryInMemory } from '../../repositories/in-memory/TransactionRepositoryInMemory';
import { Wallet } from '../../entities/Wallet';
import { createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { CreateTransactionUseCase } from './CreateTransactionUseCase';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { createBrokerFactory } from '../brokers/CreateBrokerUseCase.factory';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { getNewTransactionData } from './CreateTransactionUseCase.factory';
import { createAssetFactory } from '../assets/CreateAssetUseCase.factory';
import { ITransactionRepository } from '../../repositories/interfaces/ITransaction';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';

describe('WHEN list transactions', () => {
  let transactionRepo: ITransactionRepository;
  let walletRepo: IWalletRepository;
  let brokerRepo: IBrokerRepository;
  let assetRepo: IAssetRepository;
  let userRepo: IUserRepository;
  let wallet: Wallet;
  let useCase: ListTransactionUseCase;

  beforeEach(async () => {
    transactionRepo = new TransactionRepositoryInMemory();
    useCase = new ListTransactionUseCase(transactionRepo);
    walletRepo = new WalletRepositoryInMemory();
    brokerRepo = new BrokerRepositoryInMemory();
    assetRepo = new AssetRepositoryInMemory();
    userRepo = new UserRepositoryInMemory();
    const user = await createUserFactory(userRepo);
    wallet = await createWalletFactory(walletRepo, user);
    const broker = await createBrokerFactory(brokerRepo, user);
    const asset = await createAssetFactory(assetRepo, user);
    new CreateTransactionUseCase(transactionRepo, walletRepo, brokerRepo, assetRepo)
      .execute(user, getNewTransactionData(wallet, broker, asset));
  });

  test('WITH one transaction on database THEN get the transaction', async () => {
    const transactions = await useCase.execute(wallet);
    expect(transactions.length).toBe(1);
  });

  test('WITH two transactions from different users on database THEN get only the user transaction', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const anotherWallet = await createWalletFactory(walletRepo, anotherUser);
    const anotherBroker = await createBrokerFactory(brokerRepo, anotherUser);
    const anotherAsset = await createAssetFactory(assetRepo, anotherUser);
    await new CreateTransactionUseCase(transactionRepo, walletRepo, brokerRepo, assetRepo)
      .execute(anotherUser, getNewTransactionData(anotherWallet, anotherBroker, anotherAsset));
    const transactions = await useCase.execute(anotherWallet);
    expect(transactions.length).toBe(1);
  });
});
