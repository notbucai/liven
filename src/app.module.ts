import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './module/users/users.module';
import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';
import { CommonModule } from './module/common/common/common.module';
import { RedisModule } from './module/common/redis/redis.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/liven', { useNewUrlParser: true, useUnifiedTopology: true }),
    CommonModule,
    AuthModule,
    UsersModule,
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    // RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
