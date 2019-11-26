import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { RedisModule } from '../redis/redis.module';
import { UsersModule } from '../../../module/users/users.module';

@Module({
  imports: [RedisModule, UsersModule],
  providers: [CommonService],
  controllers: [CommonController],
})
export class CommonModule { }
