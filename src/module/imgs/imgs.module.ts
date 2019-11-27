import { Module } from '@nestjs/common';
import { ImgsController } from './imgs.controller';
import { ImgsService } from './imgs.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Img } from '../../schema/img.schema';

@Module({
  imports: [TypegooseModule.forFeature([Img])],
  controllers: [ImgsController],
  providers: [ImgsService],
})
export class ImgsModule { }
