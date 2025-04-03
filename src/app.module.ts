import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'database',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false, // 프로덕션에서는 false로 설정
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
