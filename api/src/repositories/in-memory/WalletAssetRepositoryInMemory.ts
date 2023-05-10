import { Wallet } from '../../entities/Wallet';
import { WalletAsset } from '../../entities/WalletAsset';
import { IWalletAssetCreateData, IWalletAssetRepository } from '../interfaces/IWalletAssetRepository';

export class WalletAssetRepositoryInMemory implements IWalletAssetRepository {
  private repo: WalletAsset[] = [];
  private nextId = 1;

  create(data: IWalletAssetCreateData): Promise<WalletAsset> {
    const record = new WalletAsset();
    record.wallet = data.wallet;
    record.broker = data.broker;
    record.asset = data.asset;
    record.averageUnitPrice = data.averageUnitPrice;
    record.purchasedQuantity = data.purchasedQuantity;
    record.quantity = data.quantity;
    record.gainLoss = data.gainLoss;
    record.comment = data.comment;
    record.id = this.nextId;
    this.nextId += 1;
    this.repo.push(record);
    return Promise.resolve(record);
  }

  get(wallet: Wallet, id: number): Promise<WalletAsset> {
    return Promise.resolve(this.repo.find(r => r.wallet.id === wallet.id && r.id === id));
  }
}
