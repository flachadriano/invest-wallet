import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: 'date', name: 'created_at', default: 'now()' })
  createdAt: Date;
}
