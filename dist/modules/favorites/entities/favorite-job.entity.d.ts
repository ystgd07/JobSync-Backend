import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';
export declare class FavoriteJob {
    id: number;
    userId: number;
    jobId: number;
    notes: string;
    status: string;
    createdAt: Date;
    user: User;
    job: Job;
}
