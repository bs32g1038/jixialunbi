// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { staticAssetsPath } from './utils/path.util';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { SESSION_SECRET } from './configs/index.config';
import * as log4js from 'log4js';
import logger, { requestInfoLogger } from './utils/logger.util';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(staticAssetsPath, { prefix: '/static/' });
  app.use(cookieParser());
  app.use(json({ limit: '20mb' }));
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(log4js.connectLogger(requestInfoLogger, { level: 'info' }));
  await app.listen(4000, '0.0.0.0');
  logger.info(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
