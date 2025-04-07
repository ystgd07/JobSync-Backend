import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteJob } from './entities/favorite-job.entity';
import { Job } from '../jobs/entities/job.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteJob)
    private favoriteJobsRepository: Repository<FavoriteJob>,
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async addFavorite(
    userId: number,
    jobId: number,
    notes?: string,
  ): Promise<FavoriteJob> {
    // 공고 존재 여부 확인
    const job = await this.jobsRepository.findOne({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException('해당 공고를 찾을 수 없습니다.');
    }

    // 이미 찜한 경우 확인
    const existing = await this.favoriteJobsRepository.findOne({
      where: { userId, jobId },
    });

    if (existing) {
      throw new ConflictException('이미 찜한 공고입니다.');
    }

    // 찜하기 생성
    const favorite = this.favoriteJobsRepository.create({
      userId,
      jobId,
      notes,
      status: 'active',
    });

    return this.favoriteJobsRepository.save(favorite);
  }

  async removeFavorite(userId: number, favoriteId: number): Promise<void> {
    const favorite = await this.favoriteJobsRepository.findOne({
      where: { id: favoriteId, userId },
    });

    if (!favorite) {
      throw new NotFoundException('찜한 공고를 찾을 수 없습니다.');
    }

    await this.favoriteJobsRepository.remove(favorite);
  }

  async getFavorites(userId: number): Promise<FavoriteJob[]> {
    return this.favoriteJobsRepository.find({
      where: { userId, status: 'active' },
      relations: ['job'],
      order: { createdAt: 'DESC' },
    });
  }

  async checkFavorite(userId: number, jobId: number): Promise<boolean> {
    const favorite = await this.favoriteJobsRepository.findOne({
      where: { userId, jobId, status: 'active' },
    });

    return !!favorite;
  }
}
