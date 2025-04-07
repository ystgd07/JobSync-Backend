import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column({ name: 'external_id' })
  externalId: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  location: string;

  @Column({ name: 'annual_from', nullable: true })
  annualFrom: number;

  @Column({ name: 'annual_to', nullable: true })
  annualTo: number;

  @Column({ name: 'detailurl', nullable: true })
  detailUrl: string;

  @Column({ name: 'due_time', type: 'timestamp', nullable: true })
  dueTime: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'posted_date', type: 'timestamp', nullable: true })
  postedDate: Date;

  @Column({ name: 'closing_date', type: 'timestamp', nullable: true })
  closingDate: Date;

  @Column({
    name: 'scraped_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  scrapedAt: Date;

  @Column({ default: 'active' })
  status: string;

  @Column({
    name: 'last_validated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastValidatedAt: Date;

  @Column({ nullable: true })
  position: string;
}
