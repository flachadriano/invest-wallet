import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn({ name: 'wallet_id' })
    id: number;

  @ManyToOne(() => User, user => user.wallets)
    user: User;

  @Column({ type: 'text' })
    name: string;
}
