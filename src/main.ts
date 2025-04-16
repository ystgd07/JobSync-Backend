import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // 로그 파일 설정
  const fs = require('fs');
  const logDir = './logs';

  // 로그 디렉토리가 없으면 생성
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // 로그 파일 스트림 생성
  const logStream = fs.createWriteStream(`${logDir}/app-${Date.now()}.log`, {
    flags: 'a',
  });

  // 로그 출력 함수
  const logToFile = (message) => {
    const timestamp = new Date().toISOString();
    logStream.write(`${timestamp} - ${message}\n`);
  };

  logToFile('서버 시작 중...');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // 쿠키 파서 미들웨어 추가
  app.use(cookieParser());
  app.setGlobalPrefix('api', {
    exclude: ['/search/test', '/auth/google', '/auth/google/callback'], // 테스트 API 경로
  }); // 모든 API에 /api prefix 추가

  // CORS 설정 추가
  app.enableCors({
    origin: ['https://www.jobsyncapp.com', 'https://jobsyncapp.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // ValidationPipe 활성화
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true, // 정의되지 않은 속성 제거
      forbidNonWhitelisted: false, // 알 수 없는 속성이 있어도 오류 발생 안함
      validateCustomDecorators: false, // 커스텀 데코레이터 검증 비활성화
      skipMissingProperties: true, // 누락된 속성 무시
      disableErrorMessages: false, // 디버깅을 위해 오류 메시지 활성화
    }),
  );

  // 모든 요청을 로깅하는 미들웨어 추가
  app.use((req, res, next) => {
    const requestLog = `${req.method} ${req.url}, headers: ${JSON.stringify(req.headers)}`;
    console.log(requestLog);
    logToFile(requestLog);

    // 응답 완료 후 로깅
    res.on('finish', () => {
      const responseLog = `Response ${res.statusCode} for ${req.method} ${req.url}`;
      console.log(responseLog);
      logToFile(responseLog);
    });

    next();
  });

  // 전역 예외 필터 추가
  app.useGlobalFilters(
    new (class AllExceptionsFilter {
      catch(exception: any, host: any) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // 오류 로깅
        const errorLog = `예외 발생: ${request.method} ${request.url}, 
      오류: ${exception.message}, 
      스택: ${exception.stack}`;

        console.error(errorLog);
        logToFile(errorLog);

        // 클라이언트에 응답
        const status = exception.getStatus ? exception.getStatus() : 500;
        const message = exception.message || '서버 오류가 발생했습니다';

        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: message,
          error:
            process.env.NODE_ENV === 'production' ? undefined : exception.stack,
        });
      }
    })(),
  );

  const config = new DocumentBuilder()
    .setTitle('JobSync API')
    .setDescription('JobSync API 문서')
    .setVersion('1.0')
    .addBearerAuth() // JWT 인증 추가
    .addOAuth2({
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: '/auth/google',
          scopes: {},
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

