import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../../schema/tag.schema';
import { ReturnModelType, getModelForClass } from '@typegoose/typegoose';
import { Img } from '../../schema/img.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private readonly model: ReturnModelType<typeof Tag>) { }

  create(tag: Tag) {
    return this.model.create(tag);
  }

  delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  update(tag: Tag) {
    return this.model.updateOne({ _id: tag._id }, tag);
  }

  getById(id: string) {
    return this.model.find({ _id: id });
  }

  async read() {
    return await this.model.find({}).populate('img');
  }

}
