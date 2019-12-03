import { Controller, Param, Get, Body, Delete, Post, Put, UseInterceptors, UploadedFile, ForbiddenException, UseGuards, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgsService as Service } from './imgs.service';
import { Img as SchemaDto } from '../../schema/img.schema';
import { ApiUseTags, ApiConsumes, ApiImplicitFile, ApiBearerAuth } from '@nestjs/swagger';
import { CosService } from '../cos/cos.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestO } from 'express';
import { IPlayload } from '../auth/jwt.strategy';
import { parse } from 'path';
import { md5 } from 'utility';
import { imgToVariousBuffer } from '../../utils';

interface IUploadFile {
  /** Field name specified in the form */
  fieldname: string;
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination: string;
  /** Location of the uploaded file (DiskStorage) */
  path: string;
  /** A Buffer of the entire file (MemoryStorage) */
  buffer: Buffer;
}

@Controller('imgs')
@ApiUseTags('imgs')
export class ImgsController {
  constructor(
    private readonly service: Service,
    private readonly cosService: CosService,
  ) { }

  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'List of cats' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter(_, { mimetype }, callback) {
      console.log(mimetype);

      if (/^image\//.test(mimetype) && /\/(jpeg|png|jpg|gif|bmp)$/.test(mimetype)) {

        callback(null, true);

      } else {
        callback(new ForbiddenException('只能上传图片'), false);
      }
    },
  }))
  async upload(@Request() req: RequestO, @UploadedFile() file: IUploadFile) {
    const { id: userId } = req.user as IPlayload;
    const { originalname, buffer } = file;
    const { ext, name } = parse(originalname);
    const filename = md5(name + Date.now().toString() + userId, 'hex');
    // 最终数据库只储存一个md5后的id，凭借type 可以得到
    const toImgBufferTypes = [
      {
        type: '-mini',
        width: 200,
        height: 400,
      },
      {
        type: '-general',
        width: 800,
      },
      {
        type: '',
      },
    ];
    // 通过一个工具库得到三张不同尺寸大小的图片
    const imgBuffers = await imgToVariousBuffer(buffer, toImgBufferTypes);
    // 将图片保存到第三方服务器
    const imgCoss = imgBuffers.map(async ({ buffer: toBuffer, type }) => {
      return this.cosService.putObject(filename + type + ext, toBuffer);
    });
    await Promise.all(imgCoss);
    // 将图片id保存到数据库
    const imgObj: object = {
      user: userId,
      url: filename,
    };

    // 最终返回，只返回图片id
    return this.service.create(imgObj as SchemaDto);
  }

  @Get()
  list() {
    return this.service.read();
  }

  @Post()
  create(@Body() tagDto: SchemaDto) {
    return this.service.create(tagDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Put()
  update(@Body() tagDto: SchemaDto) {
    return this.service.update(tagDto);
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.service.getById(id);
  }

}
