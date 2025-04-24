import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { JobPaginatedResponseDto, JobDto } from './dto/job-response.dto';

@ApiTags('공고')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: '공고 목록 조회 (무한 스크롤링)' })
  @ApiResponse({
    status: 200,
    description: '공고 목록 및 다음 페이지 커서',
    type: JobPaginatedResponseDto,
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    description: '마지막으로 조회한 공고의 ID (Base64 인코딩됨)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '페이지당 항목 수',
    type: Number,
  })
  async getJobs(
    @Query('cursor') cursor?: string,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ): Promise<JobPaginatedResponseDto> {
    return this.jobsService.getJobs(cursor, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: '공고 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '공고 상세 정보',
    type: JobDto,
  })
  async getJobById(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.getJobById(id);
  }
}
