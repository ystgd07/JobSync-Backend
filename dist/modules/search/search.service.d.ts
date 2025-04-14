import { Repository } from 'typeorm';
import { Job } from '../jobs/entities/job.entity';
export declare class SearchService {
    private readonly jobRepository;
    private readonly logger;
    constructor(jobRepository: Repository<Job>);
    getJobsByCategory(searchParams: any): Promise<any>;
    private encodeCursor;
    private decodeCursor;
}
