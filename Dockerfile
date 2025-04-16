# 빌드 스테이지
FROM node:20-alpine AS build

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 실행 스테이지
FROM node:20-alpine

WORKDIR /app

# 프로덕션 의존성만 설치
COPY package*.json ./
RUN npm ci --only=production

# 빌드된 애플리케이션 복사
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# 로그 디렉토리 생성
RUN mkdir -p logs

# 환경 변수 설정
ENV NODE_ENV production

EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "dist/main"]