import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like as Schema } from '../../schema/like.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { ITag } from './like.dto';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Schema.name) private readonly model: ReturnModelType<typeof Schema>) { }

  like(like: ITag) {
    return this.model.updateOne(like, { $set: like }, { upsert: true });
  }

  unlike(like: ITag) {
    return this.model.deleteOne(like);
  }

  create(like: Schema) {
    return this.model.create(like);
  }

  delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  update(like: Schema) {
    return this.model.updateOne({ _id: like._id }, like);
  }

  getById(id: string) {
    return this.model.find({ _id: id })
      .populate({ path: 'user' })
      .populate('pin');
  }

  getByPId(id: string) {
    return this.model.find({ _id: id })
      .populate({ path: 'user' });
      // .populate('pin');
  }

  getByUId(id: string) {
    return this.model.find({ user: id })
      // .populate({
      //   path: 'user',
      //   populate: {
      //     path: 'avatar',
      //   },
      // })
      .populate('pin');
  }

  read() {
    return this.model
      .find({})
      .populate({
        path: 'user',
        populate: {
          path: 'avatar',
        },
      })
      .populate('pin');
  }
}
