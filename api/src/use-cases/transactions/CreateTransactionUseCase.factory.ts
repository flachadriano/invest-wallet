import { Asset } from '../../entities/Asset';
import { Broker } from '../../entities/Broker';
import { Transaction } from '../../entities/Transaction';
import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { AssetRepositoryInMemory } from '../../repositories/in-memory/AssetRepositoryInMemory';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { TransactionRepositoryInMemory } from '../../repositories/in-memory/TransactionRepositoryInMemory';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { ITransactionRepository } from '../../repositories/interfaces/ITransaction';
import { createAssetFactory } from '../assets/CreateAssetUseCase.factory';
import { createBrokerFactory } from '../brokers/CreateBrokerUseCase.factory';
import { createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { CreateTransactionUseCase } from './CreateTransactionUseCase';

export const getNewTransactionData = (broker: Broker, asset: Asset) => ({
  brokerId: broker.id,
  assetId: asset.id,
  operation: 1,
  transactionDate: new Date(),
  unitPrice: 2.34,
  quantity: 10,
  total: 23.4,
  comment: undefined
});

export async function createTransactionFactory(
  user: User,
  wallet?: Wallet,
  transactionRepo?: ITransactionRepository,
  brokerRepo?: IBrokerRepository,
  assetRepo?: IAssetRepository,
  broker?: Broker,
  asset?: Asset
): Promise<Transaction> {
  const brokerRepoLocal = brokerRepo || new BrokerRepositoryInMemory();
  const assetRepoLocal = assetRepo || new AssetRepositoryInMemory();
  return new CreateTransactionUseCase(
    transactionRepo || new TransactionRepositoryInMemory(),
    brokerRepoLocal,
    assetRepoLocal
  ).execute(
    user,
    wallet || await createWalletFactory(),
    getNewTransactionData(
      broker || await createBrokerFactory(brokerRepoLocal),
      asset || await createAssetFactory(assetRepoLocal)
    )
  );
}
