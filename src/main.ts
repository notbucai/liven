import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResBodyHandleInterceptor } from './common/interceptors/res-body-handle.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 参数验证
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory(errors) {
      return new HttpException(errors.map(error => Object.values(error.constraints)[0])[0], 400);
    },
  }));

  const options = new DocumentBuilder()
    .setTitle('Liven')
    .setDescription('Liven api docs')
    .setVersion('1.0')
    // .addTag('liven')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // 响应拦截器
  app.useGlobalInterceptors(new ResBodyHandleInterceptor());
  await app.listen(3000);
}
bootstrap();
