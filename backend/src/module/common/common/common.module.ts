import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { RedisModule } from '../redis/redis.module';
import { UsersModule } from '../../../module/users/users.module';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [RedisModule, UsersModule, SmsModule],
  providers: [CommonService],
  controllers: [CommonController],
})
export class CommonModule { }
