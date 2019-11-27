import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Tag } from '../../schema/tag.schema';

@Module({
  imports: [TypegooseModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule { }
