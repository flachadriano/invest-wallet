import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from './Wallet';
import { Broker } from './Broker';
import { Asset } from './Asset';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
    id: number;

  @ManyToOne(() => Wallet, wallet => wallet.transactions)
    wallet: Wallet;

  @ManyToOne(() => Broker, broker => broker.transactions)
    broker: Broker;

  @ManyToOne(() => Asset, asset => asset.transactions)
    asset: Asset;

  // [1-Aluguel, 2-Bonificacao, 3-Compra, 4-Dividendo, 5-Juros sobre capital proprio,
  // 6-Provento, 7-Rendimento, 8-Subscrição, 9-Venda]
  @Column({ type: 'numeric' })
    operation: number;

  @Column({ type: 'date' })
    transactionDate: Date;

  @Column({ type: 'numeric' })
    unitPrice: number;

  @Column({ type: 'numeric' })
    quantity: number;

  @Column({ type: 'numeric' })
    total: number;

  @Column({ type: 'text', nullable: true })
    comment: string;
}
