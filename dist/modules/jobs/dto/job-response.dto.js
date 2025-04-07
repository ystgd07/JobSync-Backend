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
exports.JobPaginatedResponseDto = exports.JobDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class JobDto {
    id;
    source;
    externalId;
    title;
    company;
    location;
    annualFrom;
    annualTo;
    detailUrl;
    dueTime;
    postedDate;
    status;
}
exports.JobDto = JobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 ID' }),
    __metadata("design:type", Number)
], JobDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 출처 (예: wanted, saramin)' }),
    __metadata("design:type", String)
], JobDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '원본 사이트의 공고 고유 ID' }),
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
    (0, swagger_1.ApiProperty)({ description: '공고 마감일', required: false }),
    __metadata("design:type", Date)
], JobDto.prototype, "dueTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 게시일', required: false }),
    __metadata("design:type", Date)
], JobDto.prototype, "postedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '공고 상태 (active, closed 등)' }),
    __metadata("design:type", String)
], JobDto.prototype, "status", void 0);
class JobPaginatedResponseDto {
    jobs;
    nextCursor;
    hasNextPage;
}
exports.JobPaginatedResponseDto = JobPaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [JobDto], description: '공고 목록' }),
    __metadata("design:type", Array)
], JobPaginatedResponseDto.prototype, "jobs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '다음 페이지 커서',
        required: false,
        nullable: true,
    }),
    __metadata("design:type", Object)
], JobPaginatedResponseDto.prototype, "nextCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '다음 페이지 존재 여부' }),
    __metadata("design:type", Boolean)
], JobPaginatedResponseDto.prototype, "hasNextPage", void 0);
//# sourceMappingURL=job-response.dto.js.map