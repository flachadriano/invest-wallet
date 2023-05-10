import { User } from '../../entities/User';
import { Wallet } from '../../entities/Wallet';
import { WalletAsset } from '../../entities/WalletAsset';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { IWalletAssetRepository } from '../../repositories/interfaces/IWalletAssetRepository';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  brokerId: number;
  assetId: number;
  averageUnitPrice: number;
  purchasedQuantity: number;
  quantity: number;
  gainLoss: number;
  comment: string;
}

export class CreateWalletAssetUseCase {
  constructor(
    private repo: IWalletAssetRepository,
    private brokerRepo: IBrokerRepository,
    private assetRepo: IAssetRepository
  ) {}

  async execute(user: User, wallet: Wallet, {
    brokerId, assetId, averageUnitPrice, purchasedQuantity, quantity, gainLoss, comment
  }: IRequest): Promise<WalletAsset> {
    if (!brokerId) {
      throw new UnprocessableEntity('Corretora');
    }
    if (!assetId) {
      throw new UnprocessableEntity('Ativo');
    }

    const broker = await this.brokerRepo.get(user, brokerId);
    const asset = await this.assetRepo.get(user, assetId);

    return this.repo.create({
      wallet, broker, asset, averageUnitPrice, purchasedQuantity, quantity, gainLoss, comment
    });
  }
}
