import { ApiProperty } from '@nestjs/swagger';

export enum JobCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  MOBILE = 'mobile',
  DEVOPS = 'devops',
  DATA = 'data',
  SECURITY = 'security',
  FULLSTACK = 'fullstack',
}

export enum Region {
  SEOUL = '서울',
  GYEONGGI = '경기',
  INCHEON = '인천',
  BUSAN = '부산',
  DAEJEON = '대전',
  DAEGU = '대구',
  GWANGJU = '광주',
  OTHER = '기타',
}

// 공고 정보를 위한 DTO
export class JobDto {
  @ApiProperty({ description: '공고 ID' })
  id: number;

  @ApiProperty({ description: '공고 출처' })
  source: string;

  @ApiProperty({ description: '외부 ID' })
  externalId: string;

  @ApiProperty({ description: '채용 포지션 제목' })
  title: string;

  @ApiProperty({ description: '회사 이름' })
  company: string;

  @ApiProperty({ description: '근무 위치', required: false })
  location?: string;

  @ApiProperty({ description: '직무 분야', enum: JobCategory, required: false })
  position?: string;

  @ApiProperty({ description: '최소 연차 요구사항', required: false })
  annualFrom?: number;

  @ApiProperty({ description: '최대 연차 요구사항', required: false })
  annualTo?: number;

  @ApiProperty({ description: '공고 상세 URL', required: false })
  detailUrl?: string;

  @ApiProperty({ description: '공고 마감 시간', required: false })
  dueTime?: Date;

  @ApiProperty({ description: '공고 상태' })
  status: string;
}

// 극도로 단순화된 검색 요청 DTO
export class SearchJobDto {
  @ApiProperty({
    required: false,
    description: '직무 분야 (쉼표로 구분)',
    example: 'frontend,backend',
  })
  categories?: string[];

  @ApiProperty({
    required: false,
    description: '지역 (쉼표로 구분)',
    example: '서울,경기',
  })
  regions?: string[];

  @ApiProperty({ required: false, description: '다음 페이지 커서' })
  cursor?: string;

  @ApiProperty({
    required: false,
    description: '페이지당 항목 수',
    default: 20,
  })
  limit?: number;
}

export class SearchResponseDto {
  @ApiProperty({
    type: [JobDto],
    description: '공고 목록',
  })
  jobs: JobDto[];

  @ApiProperty({
    description: '다음 페이지 커서',
    required: false,
    nullable: true,
    type: String,
  })
  nextCursor: string | null;

  @ApiProperty({ description: '다음 페이지 존재 여부', type: Boolean })
  hasNextPage: boolean;

  @ApiProperty({
    description: '검색 결과의 총 개수',
    type: Number,
  })
  totalCount: number;

  @ApiProperty({
    description: '직무 분야별 결과 수',
    additionalProperties: { type: 'number' },
    example: { frontend: 10, backend: 15 },
    type: 'object',
  })
  categoryCounts: Record<string, number>;

  @ApiProperty({
    description: '지역별 결과 수',
    additionalProperties: { type: 'number' },
    example: { 서울: 20, 경기: 15 },
    type: 'object',
  })
  regionCounts: Record<string, number>;
}
