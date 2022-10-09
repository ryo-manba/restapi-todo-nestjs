import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // whitelistをtrueにすることで,dtoに含まれていない属性を省く
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    // cookieベースでJWTトークンを通信する
    credentials: true,
    // Reactのドメインからのアクセスを許可する
    origin: [
      'http://localhost:3000',
      'https://frontend-todo-nextjs-sigma.vercel.app',
    ],
  });
  app.use(cookieParser());
  app.use(
    // cookieから受け取ったする
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
      value: (req: Request) => {
        // クライアントからヘッダーで受け取ったcsrf-tokenを渡す
        return req.header('csrf-token');
      },
    }),
  );
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
