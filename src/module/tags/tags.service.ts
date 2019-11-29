import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../../schema/tag.schema';
import { ReturnModelType, getModelForClass } from '@typegoose/typegoose';
import { Img } from '../../schema/img.schema';
import { TagMap } from '../../schema/tagmap.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private readonly model: ReturnModelType<typeof Tag>,
    @InjectModel(TagMap.name) private tagMapModel: ReturnModelType<typeof TagMap>,

  ) { }

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

  read() {
    return this.model.find({}).populate('img');
  }

  getAll() {
    return this.tagMapModel.find({}).sort({ tag: -1 }).populate('user').populate('tag');
  }

  byUserId(id: string) {
    return this.tagMapModel.find({ user: id }).populate('tag');
  }

  byTagId(id: string) {
    return this.tagMapModel.find({ tag: id }).populate('user').populate('tag');
  }

  attended(tagmap: { tag: string, user: string }) {
    return this.tagMapModel.updateOne(tagmap, { $set: tagmap }, { upsert: true });
  }

  unattended(tagmap: { tag: string, user: string }) {
    return this.tagMapModel.deleteOne(tagmap);
  }

}
