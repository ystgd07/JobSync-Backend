import { Controller, Get, Logger, Query, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @Get('test')
  testEndpoint(@Query() query: any) {
    this.logger.log(`테스트 엔드포인트 호출, 쿼리: ${JSON.stringify(query)}`);

    // 경력 파라미터 테스트
    let decodedExperiences = '';
    if (query.experiences) {
      try {
        decodedExperiences = decodeURIComponent(query.experiences);
      } catch (e) {
        decodedExperiences = '디코딩 실패: ' + e.message;
      }
    }

    return {
      success: true,
      message: '테스트 API가 정상 작동합니다.',
      receivedQuery: query,
      decodedExperiences,
    };
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
      // experiences 파라미터 상세 로깅
      this.logger.log(
        `경력 파라미터(experiences): ${query.experiences}, 타입: ${typeof query.experiences}`,
      );

      // 경력 처리 로직 강화
      let annualExperienceValue: number | null = null;
      if (query.experiences) {
        try {
          // experiences가 문자열 '신입'을 포함하는지 확인 (URL 인코딩 문제 방지)
          const expStr = decodeURIComponent(
            query.experiences.toString().toLowerCase(),
          );
          this.logger.log(`디코딩된 경력 파라미터: ${expStr}`);

          if (expStr.includes('신입') || expStr === '0') {
            annualExperienceValue = 0;
          } else {
            // 숫자로 변환 시도
            const parsedValue = parseInt(expStr, 10);
            annualExperienceValue = isNaN(parsedValue) ? null : parsedValue;
          }
        } catch (e) {
          this.logger.error(`경력 파라미터 처리 중 오류: ${e.message}`);
        }
      } else if (query.annualExperience) {
        try {
          const parsedValue = parseInt(query.annualExperience, 10);
          annualExperienceValue = isNaN(parsedValue) ? null : parsedValue;
        } catch (e) {
          this.logger.error(`annualExperience 처리 중 오류: ${e.message}`);
        }
      }

      this.logger.log(
        `변환된 경력 값: ${annualExperienceValue}, 타입: ${typeof annualExperienceValue}`,
      );

      const searchParams = {
        categories: query.categories ? query.categories.split(',') : [],
        regions: query.regions ? query.regions.split(',') : [],
        annualExperience: annualExperienceValue,
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
        annualExperience: null, // 경력 제한 없음
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
    @Query('experiences') experiences?: string,
  ) {
    try {
      // 경력 파라미터 처리
      let annualExperience: number | null = null;
      if (experiences) {
        try {
          // experiences가 문자열 '신입'을 포함하는지 확인 (URL 인코딩 문제 방지)
          const expStr = decodeURIComponent(
            experiences.toString().toLowerCase(),
          );
          this.logger.log(`디코딩된 경력 파라미터: ${expStr}`);

          if (expStr.includes('신입') || expStr === '0') {
            annualExperience = 0;
          } else {
            // 숫자로 변환 시도
            const parsedValue = parseInt(expStr, 10);
            annualExperience = isNaN(parsedValue) ? null : parsedValue;
          }
        } catch (e) {
          this.logger.error(`경력 파라미터 처리 중 오류: ${e.message}`);
        }
      }

      // URL 파라미터로 카테고리 전달
      const searchParams = {
        categories: categories ? categories.split(',') : [],
        regions: [],
        annualExperience,
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
