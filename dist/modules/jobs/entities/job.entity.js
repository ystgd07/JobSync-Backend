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
exports.Job = void 0;
const typeorm_1 = require("typeorm");
let Job = class Job {
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
    description;
    postedDate;
    closingDate;
    scrapedAt;
    status;
    lastValidatedAt;
    position;
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'external_id' }),
    __metadata("design:type", String)
], Job.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_from', nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "annualFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_to', nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "annualTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'detailurl', nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "detailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_time', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Job.prototype, "dueTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'posted_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Job.prototype, "postedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'closing_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Job.prototype, "closingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'scraped_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Job.prototype, "scrapedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'last_validated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Job.prototype, "lastValidatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "position", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)('jobs')
], Job);
//# sourceMappingURL=job.entity.js.map