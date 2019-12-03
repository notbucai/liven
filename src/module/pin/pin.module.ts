import { Module } from '@nestjs/common';
import { PinService } from './pin.service';
import { PinController } from './pin.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Pin } from '../../schema/pin.schema';
import { LikeModule } from '../like/like.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [TypegooseModule.forFeature([Pin]), CommentModule, LikeModule],
  providers: [PinService],
  controllers: [PinController],
})
export class PinModule { }
