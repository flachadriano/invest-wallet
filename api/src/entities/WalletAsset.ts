import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from './Wallet';
import { Broker } from './Broker';
import { Asset } from './Asset';

@Entity('wallet_assets')
export class WalletAsset {
  @PrimaryGeneratedColumn({ name: 'wallet_asset_id' })
    id: number;

  @ManyToOne(() => Wallet, wallet => wallet.walletAssets)
    wallet: Wallet;

  @ManyToOne(() => Broker, broker => broker.walletAssets)
    broker: Broker;

  @ManyToOne(() => Asset, asset => asset.walletAssets)
    asset: Asset;

  @Column({ type: 'numeric' })
    averageUnitPrice: number;

  @Column({ type: 'numeric' })
    purchasedQuantity: number;

  @Column({ type: 'numeric' })
    quantity: number;

  @Column({ type: 'numeric' })
    gainLoss: number;

  @Column({ type: 'text', nullable: true })
    comment: string;
}
