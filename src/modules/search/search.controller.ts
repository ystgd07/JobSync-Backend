import { Controller, Get, Logger, Query, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @Get('test')
  testEndpoint() {
    return { success: true, message: '테스트 API가 정상 작동합니다.' };
  }

  @Get('categories')
  async getJobsByCategory(@Query() query: any): Promise<any> {
    this.logger.log(`컨트롤러 호출됨, 쿼리: ${JSON.stringify(query)}`);
    this.logger.log(`쿼리 타입: ${typeof query}`);

    // 디버깅을 위한 상세 로그
    Object.keys(query).forEach((key) => {
      this.logger.log(`쿼리 ${key}: ${query[key]}, 타입: ${typeof query[key]}`);
    });

    try {
      const searchParams = {
        categories: query.categories ? query.categories.split(',') : [],
        regions: query.regions ? query.regions.split(',') : [],
        cursor: query.cursor,
        limit: query.limit ? parseInt(query.limit, 10) : 20,
      };

      this.logger.log(
        `서비스에 전달할 파라미터: ${JSON.stringify(searchParams)}`,
      );

      return await this.searchService.getJobsByCategory(searchParams);
    } catch (error) {
      this.logger.error(`API 처리 중 오류: ${error.message}`, error.stack);
      return {
        jobs: [],
        nextCursor: null,
        hasNextPage: false,
        categoryCounts: {},
        regionCounts: {},
      };
    }
  }

  @Get('simple-categories')
  async getSimpleJobsByCategory() {
    try {
      // 고정된 파라미터로 조회 (디버깅용)
      const searchParams = {
        categories: ['개발'],
        regions: [],
        cursor: null,
        limit: 20,
      };

      return await this.searchService.getJobsByCategory(searchParams);
    } catch (error) {
      this.logger.error(`간단 API 처리 중 오류: ${error.message}`, error.stack);
      return {
        jobs: [],
        nextCursor: null,
        hasNextPage: false,
        categoryCounts: {},
        regionCounts: {},
      };
    }
  }

  @Get('cat/:categories')
  async getJobsByPathCategory(
    @Param('categories') categories: string,
    @Query('limit') limit?: string,
  ) {
    try {
      // URL 파라미터로 카테고리 전달
      const searchParams = {
        categories: categories ? categories.split(',') : [],
        regions: [],
        cursor: null,
        limit: limit ? parseInt(limit, 10) : 20,
      };

      return await this.searchService.getJobsByCategory(searchParams);
    } catch (error) {
      this.logger.error(`경로 API 처리 중 오류: ${error.message}`, error.stack);
      return {
        jobs: [],
        nextCursor: null,
        hasNextPage: false,
        categoryCounts: {},
        regionCounts: {},
      };
    }
  }
}
