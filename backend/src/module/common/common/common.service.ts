import { Injectable, HttpException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { UsersService } from '../../../module/users/users.service';
import { SignupDto } from './common.dto';
import { User, IUser } from '../../../schema/user.schema';

@Injectable()
export class CommonService {
  constructor(private readonly redis: RedisService, private readonly userService: UsersService) { }
}
