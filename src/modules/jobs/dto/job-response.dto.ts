import { ApiProperty } from '@nestjs/swagger';
import { Job } from '../entities/job.entity';

export class JobDto {
  @ApiProperty({ description: '공고 ID' })
  id: number;

  @ApiProperty({ description: '공고 출처 (예: wanted, saramin)' })
  source: string;

  @ApiProperty({ description: '원본 사이트의 공고 고유 ID' })
  externalId: string;

  @ApiProperty({ description: '채용 포지션 제목' })
  title: string;

  @ApiProperty({ description: '회사 이름' })
  company: string;

  @ApiProperty({ description: '근무 위치', required: false })
  location: string;

  @ApiProperty({ description: '최소 연차 요구사항', required: false })
  annualFrom: number;

  @ApiProperty({ description: '최대 연차 요구사항', required: false })
  annualTo: number;

  @ApiProperty({ description: '공고 상세 URL', required: false })
  detailUrl: string;

  @ApiProperty({ description: '공고 마감일', required: false })
  dueTime: Date;

  @ApiProperty({ description: '공고 게시일', required: false })
  postedDate: Date;

  @ApiProperty({ description: '공고 상태 (active, closed 등)' })
  status: string;
}

export class JobPaginatedResponseDto {
  @ApiProperty({ type: [JobDto], description: '공고 목록' })
  jobs: JobDto[];

  @ApiProperty({
    description: '다음 페이지 커서',
    required: false,
    nullable: true,
  })
  nextCursor: string | null;

  @ApiProperty({ description: '다음 페이지 존재 여부' })
  hasNextPage: boolean;
}
