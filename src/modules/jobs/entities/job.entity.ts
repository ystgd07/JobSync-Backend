import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity('jobs')
@Unique('unique_job', ['source', 'externalId'])
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  source: string;

  @Column({ name: 'external_id', length: 50, nullable: false })
  externalId: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  company: string;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({ name: 'annual_from', type: 'integer', nullable: true })
  annualFrom: number;

  @Column({ name: 'annual_to', type: 'integer', nullable: true })
  annualTo: number;

  @Column({ name: 'detailurl', type: 'text', nullable: true })
  detailUrl: string;

  @Column({ name: 'due_time', type: 'timestamp', nullable: true })
  dueTime: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'posted_date', type: 'timestamp', nullable: true })
  postedDate: Date;

  @Column({ name: 'closing_date', type: 'timestamp', nullable: true })
  closingDate: Date;

  @Column({
    name: 'scraped_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  scrapedAt: Date;

  @Column({
    length: 20,
    nullable: false,
    default: 'active',
  })
  status: string;

  @Column({
    name: 'last_validated_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastValidatedAt: Date;

  @Column({ name: 'position', length: 100, nullable: true })
  position: string;
}
