import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';

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
}
