import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment as Schema } from '../../schema/comment.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Schema.name) private readonly model: ReturnModelType<typeof Schema>) { }

  create(tag: Schema) {
    return this.model.create(tag);
  }

  delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  update(schema: Schema) {
    return this.model.updateOne({ _id: schema._id }, schema);
  }

  getByPId(id: string) {
    return this.model.find({ pin: id })
      .populate({
        path: 'user',
        populate: {
          path: 'avatar',
        },
      })
      .populate({
        path: 'replyUser',
        populate: {
          path: 'avatar',
        },
      })
      // .populate('pin')
      .populate('replyComment');
  }

  getByUId(id: string) {
    return this.model.find({ user: id })
      // .populate({
      //   path: 'user',
      //   populate: {
      //     path: 'avatar',
      //   },
      // })
      .populate({
        path: 'replyUser',
        populate: {
          path: 'avatar',
        },
      })
      .populate('pin')
      .populate('replyComment');
  }

  getById(id: string) {
    return this.model.find({ _id: id })
      .populate({
        path: 'user',
        populate: {
          path: 'avatar',
        },
      })
      .populate({
        path: 'replyUser',
        populate: {
          path: 'avatar',
        },
      })
      .populate('pin')
      .populate('replyComment');
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
      .populate({
        path: 'replyUser',
        populate: {
          path: 'avatar',
        },
      })
      .populate('pin')
      .populate('replyComment');
  }
}
