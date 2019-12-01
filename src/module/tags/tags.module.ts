import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Tag } from '../../schema/tag.schema';
import { TagMap } from '../../schema/tagmap.schema';

@Module({
  imports: [TypegooseModule.forFeature([Tag, TagMap])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule { }
