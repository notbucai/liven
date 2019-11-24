import { Injectable } from '@nestjs/common';
import { User } from '../../common/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) public readonly userModel: ReturnModelType<typeof User>) { }

  isPhoneNotExist(phone: string) {
    return this.userModel.findOne({ phone });
  }
  isUsernameNotExist(username: string) {
    return this.userModel.findOne({ username });
  }

  save(doc: User) {
    return this.userModel.create(doc);
  }

  findByPhone(phone: string) {
    return this.userModel.findOne({ phone });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  repass(id: string, password: string) {
    return this.userModel.findByIdAndUpdate(id, { password });
  }
}
