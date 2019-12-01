import { Injectable } from '@nestjs/common';
import { User, IUser } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Follow } from '../../schema/follow.schema';
import { FollowUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) public readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Follow.name) public readonly followModel: ReturnModelType<typeof Follow>,
  ) { }

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
      .skip(page * limit)
      .populate('avatar');

  }

  save(doc: User) {
    return this.userModel.create(doc);
  }

  deleteById(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  findById(id: string) {
    return this.userModel.findById(id, { password: 0 });
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

  followList(user: string) {
    return this.followModel.find({ user }).populate('user').populate('followUser');
  }

  followerList(followUser: string) {
    return this.followModel.find({ followUser }).populate('user').populate('followUser');
  }

  follow({ user, followUser }: FollowUserDto) {
    return this.followModel.updateOne({ user, followUser }, { $set: { user, followUser } }, { upsert: true });
  }

  unfollow({ user, followUser }: FollowUserDto) {
    return this.followModel.deleteOne({ user, followUser });
  }
}
