import { beforeEach, describe, expect, test } from 'vitest';
import { createTransactionFactory, getNewTransactionData } from './CreateTransactionUseCase.factory';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { UpdateTransactionUseCase } from './UpdateTransactionUseCase';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { TransactionRepositoryInMemory } from '../../repositories/in-memory/TransactionRepositoryInMemory';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { Transaction } from '../../entities/Transaction';
import { Broker } from '../../entities/Broker';
import { createBrokerFactory, createBrokerFactoryAnother } from '../brokers/CreateBrokerUseCase.factory';
import { Asset } from '../../entities/Asset';
import { createAssetAnotherFactory, createAssetFactory } from '../assets/CreateAssetUseCase.factory';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';

describe('WHEN update a transaction', () => {
  let userRepo: IUserRepository;
  let brokerRepo: IBrokerRepository;
  let assetRepo: IAssetRepository;
  let user: User;
  let wallet: Wallet;
  let transaction: Transaction;
  let broker: Broker;
  let asset: Asset;
  let useCase: UpdateTransactionUseCase;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory();
    const transactionRepo = new TransactionRepositoryInMemory();
    brokerRepo = new BrokerRepositoryInMemory();
    assetRepo = new AssetRepositoryInMemory();

    user = await createUserFactory(userRepo);
    wallet = await createWalletFactory();
    broker = await createBrokerFactory(brokerRepo);
    asset = await createAssetFactory(assetRepo);
    transaction = await createTransactionFactory(
      user,
      wallet,
      transactionRepo,
      brokerRepo,
      assetRepo,
      broker,
      asset
    );

    useCase = new UpdateTransactionUseCase(
      transactionRepo,
      brokerRepo,
      assetRepo
    );
  });

  test('WITH a minimal valid data THEN create a transactions', () => {
    expect(useCase.execute(user, wallet, transaction.id, getNewTransactionData(broker, asset)))
      .resolves.toBeInstanceOf(Transaction);
  });

  test('WITH no broker THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), brokerId: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH an invalid broker THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), brokerId: 999999
    })).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH a broker of another user THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const anotherBroker = await createBrokerFactoryAnother(brokerRepo, anotherUser);
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), brokerId: anotherBroker.id
    })).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH no asset THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), assetId: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH an invalid asset THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), assetId: 999999
    })).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH a asset of another user THEN raises an error', async () => {
    const anotherUser = await createUserFactoryAnother(userRepo);
    const anotherAsset = await createAssetAnotherFactory(assetRepo, anotherUser);
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), assetId: anotherAsset.id
    })).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH no operation number THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), operation: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH operation number zero THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), operation: 0
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH operation number ten THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), operation: 10
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no transaction date THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), transactionDate: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no unit price THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), unitPrice: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no quantity THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), quantity: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no total THEN raises an error', () => {
    expect(useCase.execute(user, wallet, transaction.id, {
      ...getNewTransactionData(broker, asset), total: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });
});
