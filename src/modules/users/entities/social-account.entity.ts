import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('social_accounts')
export class SocialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  provider: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @Column({ name: 'provider_data', type: 'jsonb', nullable: true })
  providerData: any;

  @ManyToOne(() => User, (user) => user.socialAccounts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
