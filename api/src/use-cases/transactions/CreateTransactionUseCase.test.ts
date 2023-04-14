import { beforeEach, describe, expect, test } from 'vitest';
import { User } from '../../entities/User';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { createBrokerFactory, createBrokerFactoryAnother } from '../brokers/CreateBrokerUseCase.factory';
import { createAssetAnotherFactory, createAssetFactory } from '../assets/CreateAssetUseCase.factory';
import { CreateTransactionUseCase } from './CreateTransactionUseCase';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { TransactionRepositoryInMemory } from '../../repositories/in-memory/TransactionRepositoryInMemory';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { Transaction } from '../../entities/Transaction';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { NotFound } from '../errors/NotFound';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { Wallet } from '../../entities/Wallet';

describe('WHEN create a transaction', () => {
  let userRepo: IUserRepository;
  let user: User;
  let wallet: Wallet;
  let walletRepo: IWalletRepository;
  let brokerRepo: IBrokerRepository;
  let assetRepo: IAssetRepository;
  let useCase: CreateTransactionUseCase;

  const getNewTransactionData = async () => {
    wallet = await createWalletFactory(walletRepo, user);
    const broker = await createBrokerFactory(brokerRepo, user);
    const asset = await createAssetFactory(assetRepo, user);

    return {
      walletId: wallet.id,
      brokerId: broker.id,
      assetId: asset.id,
      operation: 1,
      transactionDate: new Date(),
      unitPrice: 2.34,
      quantity: 10,
      total: 23.4,
      comment: undefined
    };
  };

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    user = await createUserFactory(userRepo);
    walletRepo = new WalletRepositoryInMemory();
    brokerRepo = new BrokerRepositoryInMemory();
    assetRepo = new AssetRepositoryInMemory();
    useCase = new CreateTransactionUseCase(
      new TransactionRepositoryInMemory(),
      brokerRepo,
      assetRepo
    );
  });

  test('WITH a minimal valid data THEN create a transactions', async () => {
    const promise = useCase.execute(user, wallet, await getNewTransactionData());
    expect(promise).resolves.toBeInstanceOf(Transaction);
  });

  test('WITH no broker THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, brokerId: undefined });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH an invalid broker THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, brokerId: 999999 });
    expect(promise).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH a broker of another user THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const anotherBroker = await createBrokerFactoryAnother(brokerRepo, anotherUser);
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, brokerId: anotherBroker.id });
    expect(promise).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH no asset THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, assetId: undefined });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH an invalid asset THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, assetId: 999999 });
    expect(promise).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH a asset of another user THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const anotherAsset = await createAssetAnotherFactory(assetRepo, anotherUser);
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, assetId: anotherAsset.id });
    expect(promise).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH no operation number THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, operation: undefined });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH operation number zero THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, operation: 0 });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH operation number ten THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, operation: 10 });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no operation date THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, transactionDate: undefined });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no unit price THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, unitPrice: undefined });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no quantity THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, quantity: undefined });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no total THEN raises an error', async () => {
    const data = await getNewTransactionData();
    const promise = useCase.execute(user, wallet, { ...data, total: undefined });
    expect(promise).rejects.toBeInstanceOf(UnprocessableEntity);
  });
});
