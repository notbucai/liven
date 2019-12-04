import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Comment } from '../../schema/comment.schema';

@Module({
  imports: [TypegooseModule.forFeature([Comment])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule { }
