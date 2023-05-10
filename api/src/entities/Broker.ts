import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';
import { WalletAsset } from './WalletAsset';

@Entity('brokers')
export class Broker {
  @PrimaryGeneratedColumn({ name: 'broker_id' })
    id: number;

  @ManyToOne(() => User, user => user.brokers)
    user: User;

  @Column({ type: 'text' })
    name: string;

  @Column({ type: 'text', nullable: true })
    legalName: string;

  @Column({ type: 'text', nullable: true })
    cnpj: string;

  @OneToMany(() => Transaction, transaction => transaction.broker)
    transactions: Transaction[];

  @OneToMany(() => WalletAsset, walletAsset => walletAsset.broker)
    walletAssets: WalletAsset[];
}
