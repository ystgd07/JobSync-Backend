import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가
  app.enableCors({
    origin: true, // 모든 오리진 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('JobSync API')
    .setDescription('JobSync API 문서')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: '/auth/google',
          scopes: {},
        },
      },
    })

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

