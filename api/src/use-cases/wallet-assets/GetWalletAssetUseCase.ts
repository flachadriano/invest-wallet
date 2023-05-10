import { Wallet } from '../../entities/Wallet';
import { WalletAsset } from '../../entities/WalletAsset';
import { IWalletAssetRepository } from '../../repositories/interfaces/IWalletAssetRepository';
import { NotFound } from '../errors/NotFound';

export class GetWalletAssetUseCase {
  constructor(private repo: IWalletAssetRepository) {}

  async execute(wallet: Wallet, id: number): Promise<WalletAsset> {
    const walletAsset = await this.repo.get(wallet, id);
    if (!walletAsset) {
      throw new NotFound('Ativo da carteira');
    }
    return walletAsset;
  }
}
