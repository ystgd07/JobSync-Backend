import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobPaginatedResponseDto } from './dto/job-response.dto';
export declare class JobsService {
    private jobRepository;
    constructor(jobRepository: Repository<Job>);
    getJobs(cursor?: string, limit?: number): Promise<JobPaginatedResponseDto>;
    private encodeCursor;
    private decodeCursor;
    getJobById(id: number): Promise<Job>;
}
