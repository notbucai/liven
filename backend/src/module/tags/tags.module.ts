import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Tag } from '../../schema/tag.schema';
import { TagMap } from '../../schema/tagmap.schema';
import { PinModule } from '../pin/pin.module';

@Module({
  imports: [TypegooseModule.forFeature([Tag, TagMap]), PinModule],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule { }
