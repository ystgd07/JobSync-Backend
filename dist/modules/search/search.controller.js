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
var SearchController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
let SearchController = SearchController_1 = class SearchController {
    searchService;
    logger = new common_1.Logger(SearchController_1.name);
    constructor(searchService) {
        this.searchService = searchService;
    }
    testEndpoint() {
        return { success: true, message: '테스트 API가 정상 작동합니다.' };
    }
    async getJobsByCategory(query) {
        this.logger.log(`컨트롤러 호출됨, 쿼리: ${JSON.stringify(query)}`);
        this.logger.log(`쿼리 타입: ${typeof query}`);
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
            this.logger.log(`서비스에 전달할 파라미터: ${JSON.stringify(searchParams)}`);
            return await this.searchService.getJobsByCategory(searchParams);
        }
        catch (error) {
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
    async getSimpleJobsByCategory() {
        try {
            const searchParams = {
                categories: ['개발'],
                regions: [],
                cursor: null,
                limit: 20,
            };
            return await this.searchService.getJobsByCategory(searchParams);
        }
        catch (error) {
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
    async getJobsByPathCategory(categories, limit) {
        try {
            const searchParams = {
                categories: categories ? categories.split(',') : [],
                regions: [],
                cursor: null,
                limit: limit ? parseInt(limit, 10) : 20,
            };
            return await this.searchService.getJobsByCategory(searchParams);
        }
        catch (error) {
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
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "testEndpoint", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getJobsByCategory", null);
__decorate([
    (0, common_1.Get)('simple-categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getSimpleJobsByCategory", null);
__decorate([
    (0, common_1.Get)('cat/:categories'),
    __param(0, (0, common_1.Param)('categories')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getJobsByPathCategory", null);
exports.SearchController = SearchController = SearchController_1 = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
//# sourceMappingURL=search.controller.js.map