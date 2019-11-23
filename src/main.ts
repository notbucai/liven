import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResBodyHandleInterceptor } from './common/interceptors/res-body-handle.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResBodyHandleInterceptor());
  await app.listen(3000);
}
bootstrap();
