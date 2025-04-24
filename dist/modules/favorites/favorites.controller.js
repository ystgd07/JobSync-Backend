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
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const favorites_service_1 = require("./favorites.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const favorite_job_dto_1 = require("./dto/favorite-job.dto");
let FavoritesController = class FavoritesController {
    favoritesService;
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    async addFavorite(req, createFavoriteDto) {
        const userId = req.user.id;
        return this.favoritesService.addFavorite(userId, createFavoriteDto.jobId, createFavoriteDto.notes);
    }
    async removeFavorite(req, id) {
        const userId = req.user.id;
        await this.favoritesService.removeFavorite(userId, id);
        return { success: true };
    }
    async getFavorites(req) {
        const userId = req.user.id;
        return this.favoritesService.getFavorites(userId);
    }
    async checkFavorite(req, jobId) {
        const userId = req.user.id;
        const isFavorite = await this.favoritesService.checkFavorite(userId, jobId);
        return { isFavorite };
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '공고 찜하기' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '공고 찜하기 성공',
        type: favorite_job_dto_1.FavoriteJobResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, favorite_job_dto_1.CreateFavoriteJobDto]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '찜한 공고 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '찜한 공고 삭제 성공' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "removeFavorite", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '찜한 공고 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '찜한 공고 목록',
        type: [favorite_job_dto_1.FavoriteJobResponseDto],
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Get)('check/:jobId'),
    (0, swagger_1.ApiOperation)({ summary: '특정 공고 찜 상태 확인' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '찜 상태' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "checkFavorite", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, swagger_1.ApiTags)('찜하기'),
    (0, common_1.Controller)('favorites'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map