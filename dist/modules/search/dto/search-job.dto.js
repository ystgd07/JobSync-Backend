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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResponseDto = exports.SearchJobDto = exports.JobDto = exports.Region = exports.JobCategory = void 0;
const swagger_1 = require("@nestjs/swagger");
var JobCategory;
(function (JobCategory) {
    JobCategory["FRONTEND"] = "frontend";
    JobCategory["BACKEND"] = "backend";
    JobCategory["MOBILE"] = "mobile";
    JobCategory["DEVOPS"] = "devops";
    JobCategory["DATA"] = "data";
    JobCategory["SECURITY"] = "security";
    JobCategory["FULLSTACK"] = "fullstack";
})(JobCategory || (exports.JobCategory = JobCategory = {}));
var Region;
(function (Region) {
    Region["SEOUL"] = "\uC11C\uC6B8";
    Region["GYEONGGI"] = "\uACBD\uAE30";
    Region["INCHEON"] = "\uC778\uCC9C";
    Region["BUSAN"] = "\uBD80\uC0B0";
    Region["DAEJEON"] = "\uB300\uC804";
    Region["DAEGU"] = "\uB300\uAD6C";
    Region["GWANGJU"] = "\uAD11\uC8FC";
    Region["OTHER"] = "\uAE30\uD0C0";
})(Region || (exports.Region = Region = {}));
class JobDto {
    id;
    source;
    externalId;
    title;
    company;
    location;
    position;
    annualFrom;
    annualTo;
    detailUrl;
    dueTime;
    status;
}
exports.JobDto = JobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 ID' }),
    __metadata("design:type", Number)
], JobDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 출처' }),
    __metadata("design:type", String)
], JobDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '외부 ID' }),
    __metadata("design:type", String)
], JobDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '채용 포지션 제목' }),
    __metadata("design:type", String)
], JobDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '회사 이름' }),
    __metadata("design:type", String)
], JobDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '근무 위치', required: false }),
    __metadata("design:type", String)
], JobDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직무 분야', enum: JobCategory, required: false }),
    __metadata("design:type", String)
], JobDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '최소 연차 요구사항', required: false }),
    __metadata("design:type", Number)
], JobDto.prototype, "annualFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '최대 연차 요구사항', required: false }),
    __metadata("design:type", Number)
], JobDto.prototype, "annualTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 상세 URL', required: false }),
    __metadata("design:type", String)
], JobDto.prototype, "detailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 마감 시간', required: false }),
    __metadata("design:type", Date)
], JobDto.prototype, "dueTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 상태' }),
    __metadata("design:type", String)
], JobDto.prototype, "status", void 0);
class SearchJobDto {
    categories;
    regions;
    cursor;
    limit;
}
exports.SearchJobDto = SearchJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '직무 분야 (쉼표로 구분)',
        example: 'frontend,backend',
    }),
    __metadata("design:type", Array)
], SearchJobDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '지역 (쉼표로 구분)',
        example: '서울,경기',
    }),
    __metadata("design:type", Array)
], SearchJobDto.prototype, "regions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '다음 페이지 커서' }),
    __metadata("design:type", String)
], SearchJobDto.prototype, "cursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '페이지당 항목 수',
        default: 20,
    }),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "limit", void 0);
class SearchResponseDto {
    jobs;
    nextCursor;
    hasNextPage;
    totalCount;
    categoryCounts;
    regionCounts;
}
exports.SearchResponseDto = SearchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [JobDto],
        description: '공고 목록',
    }),
    __metadata("design:type", Array)
], SearchResponseDto.prototype, "jobs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '다음 페이지 커서',
        required: false,
        nullable: true,
        type: String,
    }),
    __metadata("design:type", Object)
], SearchResponseDto.prototype, "nextCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '다음 페이지 존재 여부', type: Boolean }),
    __metadata("design:type", Boolean)
], SearchResponseDto.prototype, "hasNextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '검색 결과의 총 개수',
        type: Number,
    }),
    __metadata("design:type", Number)
], SearchResponseDto.prototype, "totalCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직무 분야별 결과 수',
        additionalProperties: { type: 'number' },
        example: { frontend: 10, backend: 15 },
        type: 'object',
    }),
    __metadata("design:type", Object)
], SearchResponseDto.prototype, "categoryCounts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '지역별 결과 수',
        additionalProperties: { type: 'number' },
        example: { 서울: 20, 경기: 15 },
        type: 'object',
    }),
    __metadata("design:type", Object)
], SearchResponseDto.prototype, "regionCounts", void 0);
//# sourceMappingURL=search-job.dto.js.map