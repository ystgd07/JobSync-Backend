import { JobsService } from './jobs.service';
import { JobPaginatedResponseDto } from './dto/job-response.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getJobs(cursor?: string, limit?: number): Promise<JobPaginatedResponseDto>;
    getJobById(id: number): Promise<import("./entities/job.entity").Job>;
}
