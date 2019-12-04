import { Injectable, Inject, Logger } from '@nestjs/common';
import { RedisClient, createClient } from 'redis';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  constructor(private client: RedisClient, private readonly logger: Logger) {
    this.initRedis();
  }

  private initRedis() {
    this.client.on('error', _ => {
      this.logger.error('Redis 连接失败', 'RedisService');
    });

    this.client.on('ready', _ => {
      this.logger.log('Redis 连接成功', 'RedisService');
    });

    this.client.on('reconnecting', _ => {
      this.logger.warn('Redis 正在重连', 'RedisService');
    });
  }

  public set(key: string, value: any, expire?: number) {
    this.logger.log('Redis set Key: ' + key);
    return this.client.set(key, JSON.stringify(value));
  }

  public async get(key: string) {
    this.logger.log('Redis get Key: ' + key);
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key).then((res: string) => JSON.parse(res));
  }

  public remove(key: string) {
    this.logger.warn('Redis remove Key: ' + key);
    const getAsync = promisify(this.client.del).bind(this.client);
    return getAsync(key);
  }
}
