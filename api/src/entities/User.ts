import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './Asset';
import { Broker } from './Broker';
import { RefreshToken } from './RefreshTokens';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
    id: number;

  @Column({ type: 'text', name: 'user_name' })
    name: string;

  @Column({ type: 'text', unique: true })
    email: string;

  @Column({ type: 'text', unique: true })
    login: string;

  @Column({ type: 'text' })
    password: string;

  @Column({ type: 'date', default: 'now()' })
    createdAt: Date;

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
    refreshTokens: RefreshToken[];

  @OneToMany(() => Asset, asset => asset.user)
    assets: Asset[];

  @OneToMany(() => Broker, broker => broker.user)
    brokers: Broker[];
}
