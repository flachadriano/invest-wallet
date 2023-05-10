import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';
import { WalletAsset } from './WalletAsset';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn({ name: 'asset_id' })
    id: number;

  @ManyToOne(() => User, user => user.assets)
    user: User;

  @Column({ type: 'text' })
    name: string;

  @Column({ type: 'text', default: 'Geral' })
    category: string;

  @Column({ type: 'text', default: 'Não informado' })
    subcategory: string;

  @Column({ type: 'text', nullable: true })
    legalName: string;

  @Column({ type: 'text', nullable: true })
    cnpj: string;

  @OneToMany(() => Transaction, transaction => transaction.asset)
    transactions: Transaction[];

  @OneToMany(() => WalletAsset, walletAsset => walletAsset.asset)
    walletAssets: WalletAsset[];
}
