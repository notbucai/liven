import { Injectable } from '@nestjs/common';
import { User } from '../../common/schema/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly user: ReturnModelType<typeof User>) { }

  varify(loginname: string, password: string) {
    return this.user.findOne({ $or: [{ username: loginname, phone: loginname }], password });
  }

  save(doc: User) {
    return this.user.create(doc);
  }

  findUserByPhone(phone: string) {
    return this.user.findOne({ phone });
  }

  repass(id: string, password: string) {
    return this.user.findByIdAndUpdate(id, { password });
  }
}
