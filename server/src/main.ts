import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, server);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(cors());

  await app.listen(4001);
}
bootstrap();
