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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jobs_service_1 = require("./jobs.service");
const job_response_dto_1 = require("./dto/job-response.dto");
let JobsController = class JobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async getJobs(cursor, limit) {
        return this.jobsService.getJobs(cursor, limit);
    }
    async getJobById(id) {
        return this.jobsService.getJobById(id);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '공고 목록 조회 (무한 스크롤링)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '공고 목록 및 다음 페이지 커서',
        type: job_response_dto_1.JobPaginatedResponseDto,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'cursor',
        required: false,
        description: '마지막으로 조회한 공고의 ID (Base64 인코딩됨)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: '페이지당 항목 수',
        type: Number,
    }),
    __param(0, (0, common_1.Query)('cursor')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobs", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '공고 상세 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '공고 상세 정보',
        type: job_response_dto_1.JobDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobById", null);
exports.JobsController = JobsController = __decorate([
    (0, swagger_1.ApiTags)('공고'),
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map