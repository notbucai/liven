import { Injectable } from '@nestjs/common';
import { Img as Schema } from '../../schema/img.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ImgsService {
  constructor(@InjectModel(Schema.name) private readonly model: ReturnModelType<typeof Schema>) { }

  create(img: Schema) {
    return this.model.create(img);
  }

  delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  update(img: Schema) {
    return this.model.updateOne({ _id: img._id }, img).populate('user');
  }

  getById(id: string) {
    return this.model.find({ _id: id }).populate('user');
  }

  read() {
    return this.model.find({}).populate('user');
  }
}
