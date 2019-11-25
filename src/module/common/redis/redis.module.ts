import { Module, Logger } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisClient } from 'redis';

@Module({
  providers: [RedisService, Logger, RedisClient],
  exports: [RedisService],
})
export class RedisModule { }
