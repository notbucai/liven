import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Like } from '../../schema/like.schema';

@Module({
  imports: [TypegooseModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule { }
