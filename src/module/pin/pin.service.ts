import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pin as Schema } from 'src/schema/pin.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class PinService {
  constructor(@InjectModel(Schema.name) private readonly model: ReturnModelType<typeof Schema>) { }

  create(tag: Schema) {
    return this.model.create(tag);
  }

  delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  update(tag: Schema) {
    return this.model.updateOne({ _id: tag._id }, tag);
  }

  getById(id: string) {
    return this.model.find({ _id: id });
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
      .populate('picList')
      .populate({
        path: 'tag',
        populate: { path: 'img' },
      });
  }
}
