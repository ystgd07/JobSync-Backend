"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./modules/users/entities/user.entity");
const social_account_entity_1 = require("./modules/users/entities/social-account.entity");
const refresh_token_entity_1 = require("./modules/users/entities/refresh-token.entity");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const jobs_module_1 = require("./modules/jobs/jobs.module");
const favorites_module_1 = require("./modules/favorites/favorites.module");
const search_module_1 = require("./modules/search/search.module");
const job_entity_1 = require("./modules/jobs/entities/job.entity");
const favorite_job_entity_1 = require("./modules/favorites/entities/favorite-job.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            jobs_module_1.JobsModule,
            favorites_module_1.FavoritesModule,
            search_module_1.SearchModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST'),
                    port: +configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USERNAME'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    entities: [user_entity_1.User, social_account_entity_1.SocialAccount, refresh_token_entity_1.RefreshToken, job_entity_1.Job, favorite_job_entity_1.FavoriteJob],
                    synchronize: configService.get('NODE_ENV') !== 'production',
                    logging: configService.get('NODE_ENV') === 'development',
                    ssl: true,
                    extra: {
                        ssl: {
                            rejectUnauthorized: false,
                        },
                    },
                }),
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map