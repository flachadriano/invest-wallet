import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

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
}
