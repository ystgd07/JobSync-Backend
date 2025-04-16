import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { SocialAccount } from './modules/users/entities/social-account.entity';
import { RefreshToken } from './modules/users/entities/refresh-token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { SearchModule } from './modules/search/search.module';
import { Job } from './modules/jobs/entities/job.entity';
import { FavoriteJob } from './modules/favorites/entities/favorite-job.entity';

@Module({
  imports: [
    AuthModule,
    JobsModule,
    FavoritesModule,
    SearchModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, SocialAccount, RefreshToken, Job, FavoriteJob],
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
export class AppModule {}
