import { Module, Logger } from '@nestjs/common';
import { CosService } from './cos.service';

@Module({
  imports: [],
  providers: [CosService, Logger],
  exports: [CosService],
})
export class CosModule { }
