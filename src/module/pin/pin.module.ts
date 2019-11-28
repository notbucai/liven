import { Module } from '@nestjs/common';
import { PinService } from './pin.service';
import { PinController } from './pin.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Pin } from '../../schema/pin.schema';

@Module({
  imports: [TypegooseModule.forFeature([Pin])],
  providers: [PinService],
  controllers: [PinController],
})
export class PinModule { }
