import { Wallet } from '../entities/Wallet';
import { WalletAsset } from '../entities/WalletAsset';
import AppDataSource from '../middlewares/DataSource';
import { IWalletAssetCreateData, IWalletAssetRepository } from './interfaces/IWalletAssetRepository';

export class WalletAssetRepository implements IWalletAssetRepository {
  private repo = AppDataSource.getRepository(WalletAsset);

  create(data: IWalletAssetCreateData): Promise<WalletAsset> {
    return this.repo.save(data);
  }

  get(wallet: Wallet, id: number): Promise<WalletAsset> {
    return this.repo.findOne({
      relations: { wallet: true },
      where: { wallet: { id: wallet.id }, id }
    });
  }
}
