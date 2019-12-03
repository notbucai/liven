import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './module/users/users.module';
import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';
import { CommonModule } from './module/common/common/common.module';
import { PinModule } from './module/pin/pin.module';
import { ImgsModule } from './module/imgs/imgs.module';
import { CommentModule } from './module/comment/comment.module';
import { TagsModule } from './module/tags/tags.module';
import { LikeModule } from './module/like/like.module';
import { CosModule } from './module/cos/cos.module';
import * as path from 'path';
import mongo from './config/mongo';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    TypegooseModule.forRoot(`mongodb://${mongo.host}/${mongo.db}`, { useNewUrlParser: true, useUnifiedTopology: true }),
    AuthModule,
    CommonModule,
    UsersModule,
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      path: path.resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`),
    }),
    TagsModule,
    PinModule,
    ImgsModule,
    CommentModule,
    LikeModule,
    CosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
