import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('refresh_tokens')
export class RefreshToken {

  @PrimaryGeneratedColumn({ name: 'refresh_token_id' })
  id: number;

  @Column({ type: 'date', nullable: false })
  expiresIn: Date;

  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;
}
