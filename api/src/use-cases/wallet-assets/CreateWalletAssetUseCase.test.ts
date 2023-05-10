import { beforeEach, describe, expect, test } from 'vitest';
import { CreateWalletAssetUseCase } from './CreateWalletAssetUseCase';
import { WalletAssetRepositoryInMemory } from '../../repositories/in-memory/WalletAssetRepositoryInMemory';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { User } from '../../entities/User';
import { createUserFactory } from '../users/CreateUserUseCase.factory';
import { Wallet } from '../../entities/Wallet';
import { createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { WalletRepositoryInMemory } from '../../repositories/in-memory/WalletRepositoryInMemory';
import { Broker } from '../../entities/Broker';
import { Asset } from '../../entities/Asset';
import { WalletAsset } from '../../entities/WalletAsset';
import { createBrokerFactory } from '../brokers/CreateBrokerUseCase.factory';
import { createAssetFactory } from '../assets/CreateAssetUseCase.factory';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { getWalletAssetData } from './CreateWalletAssetUseCase.factory';

describe('WHEN create an Wallet Asset', () => {
  let useCase: CreateWalletAssetUseCase;
  let user: User;
  let wallet: Wallet;
  let broker: Broker;
  let asset: Asset;

  beforeEach(async () => {
    user = await createUserFactory();
    wallet = await createWalletFactory(new WalletRepositoryInMemory());
    broker = await createBrokerFactory(new BrokerRepositoryInMemory());
    asset = await createAssetFactory(new AssetRepositoryInMemory());
    useCase = new CreateWalletAssetUseCase(
      new WalletAssetRepositoryInMemory(),
      new BrokerRepositoryInMemory(),
      new AssetRepositoryInMemory()
    );
  });

  test('WITH valid data', () => {
    expect(useCase.execute(user, wallet, getWalletAssetData(broker, asset)))
      .resolves.toBeInstanceOf(WalletAsset);
  });

  test('WITH no broker', () => {
    expect(useCase.execute(user, wallet, {
      ...getWalletAssetData(broker, asset), brokerId: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  test('WITH no asset', () => {
    expect(useCase.execute(user, wallet, {
      ...getWalletAssetData(broker, asset), assetId: undefined
    })).rejects.toBeInstanceOf(UnprocessableEntity);
  });
});
