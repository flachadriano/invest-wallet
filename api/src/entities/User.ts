import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RefreshToken } from "./RefreshTokens";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ type: 'text', name: 'user_name', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false, unique: true })
  login: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'date', default: 'now()' })
  createdAt: Date;

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];
}
