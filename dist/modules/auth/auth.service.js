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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const social_account_entity_1 = require("../users/entities/social-account.entity");
const refresh_token_entity_1 = require("../users/entities/refresh-token.entity");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    usersRepository;
    socialAccountsRepository;
    refreshTokensRepository;
    jwtService;
    configService;
    constructor(usersRepository, socialAccountsRepository, refreshTokensRepository, jwtService, configService) {
        this.usersRepository = usersRepository;
        this.socialAccountsRepository = socialAccountsRepository;
        this.refreshTokensRepository = refreshTokensRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async getUserProfile(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            select: [
                'id',
                'email',
                'name',
                'profileImage',
                'role',
                'isActive',
                'createdAt',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };
    }
    async googleLogin(userData) {
        let socialAccount = await this.socialAccountsRepository.findOne({
            where: {
                provider: 'google',
                providerId: userData.googleId,
            },
            relations: ['user'],
        });
        let user;
        if (socialAccount) {
            user = socialAccount.user;
            if (user.name !== userData.name ||
                user.profileImage !== userData.profileImage) {
                user.name = userData.name;
                user.profileImage = userData.profileImage;
                await this.usersRepository.save(user);
            }
        }
        else {
            user = await this.usersRepository.findOne({
                where: { email: userData.email },
            });
            if (user) {
                socialAccount = this.socialAccountsRepository.create({
                    userId: user.id,
                    provider: 'google',
                    providerId: userData.googleId,
                    providerData: { accessToken: userData.accessToken },
                });
                await this.socialAccountsRepository.save(socialAccount);
            }
            else {
                user = this.usersRepository.create({
                    email: userData.email,
                    name: userData.name,
                    profileImage: userData.profileImage,
                });
                await this.usersRepository.save(user);
                socialAccount = this.socialAccountsRepository.create({
                    userId: user.id,
                    provider: 'google',
                    providerId: userData.googleId,
                    providerData: { accessToken: userData.accessToken },
                });
                await this.socialAccountsRepository.save(socialAccount);
            }
        }
        return this.generateTokens(user);
    }
    async generateTokens(user) {
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
        });
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() +
            parseInt(this.configService.get('JWT_REFRESH_EXPIRATION_SECONDS') ||
                '0'));
        await this.refreshTokensRepository.save({
            userId: user.id,
            token: refreshToken,
            expiresAt,
        });
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                profileImage: user.profileImage,
            },
        };
    }
    async refreshToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const refreshTokenEntity = await this.refreshTokensRepository.findOne({
                where: { token, revoked: false },
            });
            if (!refreshTokenEntity) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            if (new Date() > refreshTokenEntity.expiresAt) {
                throw new common_1.UnauthorizedException('Refresh token expired');
            }
            const user = await this.usersRepository.findOne({
                where: { id: payload.sub },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            refreshTokenEntity.revoked = true;
            await this.refreshTokensRepository.save(refreshTokenEntity);
            return this.generateTokens(user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(social_account_entity_1.SocialAccount)),
    __param(2, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map