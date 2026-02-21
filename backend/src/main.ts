import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000/graphql',
      'http://192.168.1.20:3000',
    ],
    credentials: true,
  });
  app.use(cookieParser());

  app.use(passport.initialize());

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();
