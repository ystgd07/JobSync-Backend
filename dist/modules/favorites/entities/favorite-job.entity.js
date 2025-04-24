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
exports.FavoriteJob = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const job_entity_1 = require("../../jobs/entities/job.entity");
let FavoriteJob = class FavoriteJob {
    id;
    userId;
    jobId;
    notes;
    status;
    createdAt;
    user;
    job;
};
exports.FavoriteJob = FavoriteJob;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FavoriteJob.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], FavoriteJob.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_id' }),
    __metadata("design:type", Number)
], FavoriteJob.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FavoriteJob.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], FavoriteJob.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], FavoriteJob.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], FavoriteJob.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'job_id' }),
    __metadata("design:type", job_entity_1.Job)
], FavoriteJob.prototype, "job", void 0);
exports.FavoriteJob = FavoriteJob = __decorate([
    (0, typeorm_1.Entity)('user_favorite_jobs')
], FavoriteJob);
//# sourceMappingURL=favorite-job.entity.js.map