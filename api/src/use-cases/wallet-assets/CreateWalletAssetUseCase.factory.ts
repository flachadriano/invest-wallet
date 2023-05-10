import { Asset } from '../../entities/Asset';
import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { WalletAsset } from '../../entities/WalletAsset';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { WalletAssetRepositoryInMemory } from '../../repositories/in-memory/WalletAssetRepositoryInMemory';
import { IWalletAssetRepository } from '../../repositories/interfaces/IWalletAssetRepository';
import { createAssetFactory } from '../assets/CreateAssetUseCase.factory';
import { createBrokerFactory } from '../brokers/CreateBrokerUseCase.factory';
import { createUserFactory } from '../users/CreateUserUseCase.factory';
import { createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { CreateWalletAssetUseCase } from './CreateWalletAssetUseCase';

export const getWalletAssetData = (broker: Broker, asset: Asset) => ({
  brokerId: broker.id,
  assetId: asset.id,
  averageUnitPrice: 1.2,
  purchasedQuantity: 10,
  quantity: 10,
  gainLoss: 0,
  comment: ''
});

export const createWalletAssetFactory = async (
  repo?: IWalletAssetRepository,
  user?: User,
  wallet?: Wallet
): Promise<WalletAsset> => {
  return new CreateWalletAssetUseCase(
    repo || new WalletAssetRepositoryInMemory(),
    new BrokerRepositoryInMemory(),
    new AssetRepositoryInMemory()
  ).execute(
    user || await createUserFactory(),
    wallet || await createWalletFactory(),
    getWalletAssetData(await createBrokerFactory(), await createAssetFactory())
  );
};
