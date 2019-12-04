import { Injectable, Logger } from '@nestjs/common';
import * as Cos from 'cos-nodejs-sdk-v5';
import cosConfig from '../../config/cos.config';

@Injectable()
export class CosService {
  private cos: Cos;
  constructor(private readonly logger: Logger) {
    const { SecretId, SecretKey } = cosConfig;
    this.cos = new Cos({
      SecretId,
      SecretKey,
    });
  }
  putObject(Key: string, file: Buffer) {

    return new Promise((resolve: (value?: unknown) => void, reject: (value?: unknown) => void) => {
      this.cos.putObject({
        Bucket: cosConfig.Bucket, /* 必须 */
        Region: cosConfig.Region,    /* 必须 */
        Key,              /* 必须 */
        Body: file, // 上传文件对象
      }, (err: Error, data: object) => {
        if (err) {
          this.logger.error(err, CosService.name);
          return reject(err);
        }
        resolve(data);
      });
    });
  }
}
