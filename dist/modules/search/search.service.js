"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("../jobs/entities/job.entity");
let SearchService = SearchService_1 = class SearchService {
    jobRepository;
    logger = new common_1.Logger(SearchService_1.name);
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    async getJobsByCategory(searchParams) {
        try {
            this.logger.log(`서비스 호출됨: ${JSON.stringify(searchParams)}`);
            this.logger.log(`searchParams 타입: ${typeof searchParams}`);
            if (!searchParams) {
                this.logger.error('searchParams가 undefined 또는 null입니다.');
                return {
                    jobs: [],
                    nextCursor: null,
                    hasNextPage: false,
                    categoryCounts: {},
                    regionCounts: {},
                };
            }
            Object.keys(searchParams).forEach((key) => {
                this.logger.log(`${key}: ${JSON.stringify(searchParams[key])}, 타입: ${typeof searchParams[key]}`);
            });
            const { categories, regions, cursor, limit = 20 } = searchParams;
            let annualExperience = null;
            if (searchParams.annualExperience !== undefined &&
                searchParams.annualExperience !== null) {
                if (typeof searchParams.annualExperience === 'number') {
                    annualExperience = searchParams.annualExperience;
                }
                else if (typeof searchParams.annualExperience === 'string') {
                    const parsed = parseInt(searchParams.annualExperience, 10);
                    if (!isNaN(parsed)) {
                        annualExperience = parsed;
                    }
                }
            }
            this.logger.log(`경력 필터 값: ${annualExperience}, 타입: ${typeof annualExperience}`);
            this.logger.log(`searchParams.annualExperience 원본 값: ${searchParams.annualExperience}, 타입: ${typeof searchParams.annualExperience}`);
            let cursorId;
            if (cursor) {
                try {
                    cursorId = this.decodeCursor(cursor);
                    this.logger.log(`커서 디코딩: ${cursor} -> ID: ${cursorId}`);
                }
                catch (e) {
                    this.logger.error(`Invalid cursor: ${cursor}`, e.stack);
                }
            }
            let query = this.jobRepository
                .createQueryBuilder('job')
                .where('job.status = :status', { status: 'active' })
                .orderBy('job.id', 'DESC')
                .take(limit + 1);
            if (cursorId) {
                query = query.andWhere('job.id < :cursorId', { cursorId });
            }
            if (categories && categories.length > 0) {
                this.logger.log(`카테고리 필터 적용: ${categories.join(',')}`);
                const categoryConditions = categories.map((category, index) => {
                    const likeParamName = `likeCategory${index}`;
                    query = query.setParameter(likeParamName, `%${category}%`);
                    return `LOWER(job.position) LIKE :${likeParamName}`;
                });
                categories.forEach((category, index) => {
                    const titleParamName = `titleCategory${index}`;
                    query = query.setParameter(titleParamName, `%${category}%`);
                    categoryConditions.push(`LOWER(job.title) LIKE :${titleParamName}`);
                });
                query = query.andWhere(`(${categoryConditions.join(' OR ')})`);
                this.logger.log(`카테고리 검색 조건: ${categoryConditions.join(' OR ')}`);
            }
            if (regions && regions.length > 0) {
                this.logger.log(`지역 필터 적용: ${regions.join(',')}`);
                query = query.andWhere('job.location IN (:...regions)', { regions });
            }
            if (annualExperience !== null) {
                if (annualExperience === 0) {
                    this.logger.log('신입 공고만 필터링합니다.');
                    query = query.andWhere('(job.annualFrom = 0 OR job.annualFrom IS NULL)');
                    this.logger.log('적용된 필터: job.annualFrom = 0 OR job.annualFrom IS NULL');
                }
                else {
                    this.logger.log(`${annualExperience}년차 공고만 필터링합니다.`);
                    query = query.andWhere('(job.annualFrom = :annualExperience OR (job.annualFrom <= :annualExperience AND (job.annualTo >= :annualExperience OR job.annualTo = 100)))', { annualExperience });
                    this.logger.log(`적용된 필터: 경력 ${annualExperience}년차 포함 범위`);
                }
            }
            else {
                this.logger.log('경력 필터가 적용되지 않았습니다.');
            }
            const queryStr = query.getQueryAndParameters();
            this.logger.log(`실행 쿼리: ${queryStr[0]}`);
            this.logger.log(`쿼리 파라미터: ${JSON.stringify(queryStr[1])}`);
            const fullQuery = query.getSql();
            this.logger.log(`전체 SQL 쿼리: ${fullQuery}`);
            const countQuery = this.jobRepository
                .createQueryBuilder('job')
                .where('job.status = :status', { status: 'active' });
            if (categories && categories.length > 0) {
                const categoryConditions = categories.map((category, index) => {
                    const likeParamName = `countLikeCategory${index}`;
                    countQuery.setParameter(likeParamName, `%${category}%`);
                    return `LOWER(job.position) LIKE :${likeParamName}`;
                });
                categories.forEach((category, index) => {
                    const titleParamName = `countTitleCategory${index}`;
                    countQuery.setParameter(titleParamName, `%${category}%`);
                    categoryConditions.push(`LOWER(job.title) LIKE :${titleParamName}`);
                });
                countQuery.andWhere(`(${categoryConditions.join(' OR ')})`);
            }
            if (regions && regions.length > 0) {
                countQuery.andWhere('job.location IN (:...countRegions)', {
                    countRegions: regions,
                });
            }
            if (annualExperience !== null) {
                if (annualExperience === 0) {
                    countQuery.andWhere('(job.annualFrom = 0 OR job.annualFrom IS NULL)');
                    this.logger.log('카운트 쿼리에 신입 필터 적용');
                }
                else {
                    countQuery.andWhere('(job.annualFrom = :countAnnualExperience OR (job.annualFrom <= :countAnnualExperience AND (job.annualTo >= :countAnnualExperience OR job.annualTo = 100)))', { countAnnualExperience: annualExperience });
                    this.logger.log(`카운트 쿼리에 ${annualExperience}년차 필터 적용 (범위 포함)`);
                }
            }
            const totalCount = await countQuery.getCount();
            this.logger.log(`검색 결과 총 개수: ${totalCount}`);
            const jobs = await query.getMany();
            this.logger.log(`검색된 공고 수: ${jobs.length}`);
            const hasNextPage = jobs.length > limit;
            if (hasNextPage) {
                jobs.pop();
            }
            const nextCursor = hasNextPage && jobs.length > 0
                ? this.encodeCursor(jobs[jobs.length - 1].id)
                : null;
            return {
                jobs: jobs || [],
                nextCursor,
                hasNextPage,
                totalCount,
                categoryCounts: {},
                regionCounts: {},
            };
        }
        catch (error) {
            this.logger.error(`공고 조회 중 오류 발생: ${error.message}`, error.stack);
            return {
                jobs: [],
                nextCursor: null,
                hasNextPage: false,
                totalCount: 0,
                categoryCounts: {},
                regionCounts: {},
            };
        }
    }
    encodeCursor(id) {
        return Buffer.from(id.toString()).toString('base64');
    }
    decodeCursor(cursor) {
        const decoded = Buffer.from(cursor, 'base64').toString('ascii');
        return parseInt(decoded, 10);
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = SearchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map