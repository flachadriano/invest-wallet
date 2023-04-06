import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn({ name: 'wallet_id' })
    id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, user => user.wallets)
    user: User;

  @Column({ type: 'text' })
    name: string;
}
