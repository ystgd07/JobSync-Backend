import { Repository } from 'typeorm';
import { FavoriteJob } from './entities/favorite-job.entity';
import { Job } from '../jobs/entities/job.entity';
export declare class FavoritesService {
    private favoriteJobsRepository;
    private jobsRepository;
    constructor(favoriteJobsRepository: Repository<FavoriteJob>, jobsRepository: Repository<Job>);
    addFavorite(userId: number, jobId: number, notes?: string): Promise<FavoriteJob>;
    removeFavorite(userId: number, favoriteId: number): Promise<void>;
    getFavorites(userId: number): Promise<FavoriteJob[]>;
    checkFavorite(userId: number, jobId: number): Promise<boolean>;
}
