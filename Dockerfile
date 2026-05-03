FROM node:20-alpine

WORKDIR /app

# 의존성 파일 먼저 복사 (레이어 캐시 활용)
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

# 소스 복사 및 빌드
COPY . .

RUN npx prisma generate && npm run build

EXPOSE 3001

# 컨테이너 시작 시 DB 마이그레이션 후 서버 실행
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
