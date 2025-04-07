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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favorite_job_entity_1 = require("./entities/favorite-job.entity");
const job_entity_1 = require("../jobs/entities/job.entity");
let FavoritesService = class FavoritesService {
    favoriteJobsRepository;
    jobsRepository;
    constructor(favoriteJobsRepository, jobsRepository) {
        this.favoriteJobsRepository = favoriteJobsRepository;
        this.jobsRepository = jobsRepository;
    }
    async addFavorite(userId, jobId, notes) {
        const job = await this.jobsRepository.findOne({ where: { id: jobId } });
        if (!job) {
            throw new common_1.NotFoundException('해당 공고를 찾을 수 없습니다.');
        }
        const existing = await this.favoriteJobsRepository.findOne({
            where: { userId, jobId },
        });
        if (existing) {
            throw new common_1.ConflictException('이미 찜한 공고입니다.');
        }
        const favorite = this.favoriteJobsRepository.create({
            userId,
            jobId,
            notes,
            status: 'active',
        });
        return this.favoriteJobsRepository.save(favorite);
    }
    async removeFavorite(userId, favoriteId) {
        const favorite = await this.favoriteJobsRepository.findOne({
            where: { id: favoriteId, userId },
        });
        if (!favorite) {
            throw new common_1.NotFoundException('찜한 공고를 찾을 수 없습니다.');
        }
        await this.favoriteJobsRepository.remove(favorite);
    }
    async getFavorites(userId) {
        return this.favoriteJobsRepository.find({
            where: { userId, status: 'active' },
            relations: ['job'],
            order: { createdAt: 'DESC' },
        });
    }
    async checkFavorite(userId, jobId) {
        const favorite = await this.favoriteJobsRepository.findOne({
            where: { userId, jobId, status: 'active' },
        });
        return !!favorite;
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favorite_job_entity_1.FavoriteJob)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map