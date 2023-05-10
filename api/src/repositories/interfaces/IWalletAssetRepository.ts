import { Asset } from '../../entities/Asset';
import { Broker } from '../../entities/Broker';
import { Wallet } from '../../entities/Wallet';
import { WalletAsset } from '../../entities/WalletAsset';

export interface IWalletAssetCreateData {
  wallet: Wallet;
  broker: Broker;
  asset: Asset;
  averageUnitPrice: number;
  purchasedQuantity: number;
  quantity: number;
  gainLoss: number;
  comment: string;
}

export interface IWalletAssetRepository {
  create(data: IWalletAssetCreateData): Promise<WalletAsset>;

  get(wallet: Wallet, id: number): Promise<WalletAsset>;
}
