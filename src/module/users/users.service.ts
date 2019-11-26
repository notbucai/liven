import { Injectable } from '@nestjs/common';
import { User, IUser } from '../../common/schema/user.schema';
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

  async list(query: string = '', page: number = 1, type: string = 'all', limit = 10) {
    page = page - 1;
    return await this.userModel
      .find({ username: new RegExp(query) }, { password: 0 })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(page * limit);
  }

  save(doc: User) {
    return this.userModel.create(doc);
  }

  deleteById(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  findById(id: string) {
    return this.userModel.findById(id);
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

  create(user: IUser) {
    return this.userModel.create(user);
  }
  update(user: User) {
    return this.userModel.updateOne({ _id: user._id }, user);
  }

}
