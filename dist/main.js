"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const fs = require('fs');
    const logDir = './logs';
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    const logStream = fs.createWriteStream(`${logDir}/app-${Date.now()}.log`, {
        flags: 'a',
    });
    const logToFile = (message) => {
        const timestamp = new Date().toISOString();
        logStream.write(`${timestamp} - ${message}\n`);
    };
    logToFile('서버 시작 중...');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: false,
        validateCustomDecorators: false,
        skipMissingProperties: true,
        disableErrorMessages: false,
    }));
    app.use((req, res, next) => {
        const requestLog = `${req.method} ${req.url}, headers: ${JSON.stringify(req.headers)}`;
        console.log(requestLog);
        logToFile(requestLog);
        res.on('finish', () => {
            const responseLog = `Response ${res.statusCode} for ${req.method} ${req.url}`;
            console.log(responseLog);
            logToFile(responseLog);
        });
        next();
    });
    app.useGlobalFilters(new (class AllExceptionsFilter {
        catch(exception, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            const errorLog = `예외 발생: ${request.method} ${request.url}, 
      오류: ${exception.message}, 
      스택: ${exception.stack}`;
            console.error(errorLog);
            logToFile(errorLog);
            const status = exception.getStatus ? exception.getStatus() : 500;
            const message = exception.message || '서버 오류가 발생했습니다';
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: message,
                error: process.env.NODE_ENV === 'production' ? undefined : exception.stack,
            });
        }
    })());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('JobSync API')
        .setDescription('JobSync API 문서')
        .setVersion('1.0')
        .addBearerAuth()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map