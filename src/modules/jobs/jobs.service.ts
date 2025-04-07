import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobPaginatedResponseDto } from './dto/job-response.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  /**
   * 커서 기반 페이지네이션으로 공고 목록을 조회합니다.
   * @param cursor 마지막으로 조회한 공고의 ID (Base64 인코딩된 값)
   * @param limit 페이지당 항목 수
   * @returns 공고 목록과 다음 페이지 커서 정보
   */
  async getJobs(
    cursor?: string,
    limit: number = 20,
  ): Promise<JobPaginatedResponseDto> {
    // 1. 기본 쿼리 생성
    let query = this.jobRepository
      .createQueryBuilder('job')
      .where('job.status = :status', { status: 'active' })
      .orderBy('job.id', 'DESC')
      .take(limit + 1); // 다음 페이지 여부 확인을 위해 +1

    // 2. 커서가 있으면 해당 ID 이후의 데이터만 조회
    if (cursor) {
      // 커서 디코딩 (Base64)
      const decodedCursor = this.decodeCursor(cursor);
      query = query.andWhere('job.id < :cursor', { cursor: decodedCursor });
    }

    // 3. 쿼리 실행
    const jobs = await query.getMany();

    // 4. 다음 페이지 여부 확인
    const hasNextPage = jobs.length > limit;
    if (hasNextPage) {
      jobs.pop(); // 마지막 항목 제거 (다음 페이지 확인용이었음)
    }

    // 5. 다음 커서 생성
    const nextCursor =
      hasNextPage && jobs.length > 0
        ? this.encodeCursor(jobs[jobs.length - 1].id)
        : null;

    // 6. 결과 반환
    return {
      jobs,
      nextCursor,
      hasNextPage,
    };
  }

  /**
   * ID를 Base64로 인코딩하여 커서 생성
   */
  private encodeCursor(id: number): string {
    return Buffer.from(id.toString()).toString('base64');
  }

  /**
   * Base64 인코딩된 커서를 디코딩하여 ID 추출
   */
  private decodeCursor(cursor: string): number {
    const decoded = Buffer.from(cursor, 'base64').toString('ascii');
    return parseInt(decoded, 10);
  }

  /**
   * 특정 ID의 공고 상세 정보 조회
   */
  async getJobById(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`ID가 ${id}인 공고를 찾을 수 없습니다.`);
    }
    return job;
  }
}
