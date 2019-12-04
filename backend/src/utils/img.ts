import * as Sharp from 'sharp';

interface IType {
  type: string;
  width?: number;
  height?: number;
}

export const imgToVariousBuffer = async (buffer: Buffer, toImgBufferTypes: IType[]) => {
  // 获取当前图片大小
  const source = Sharp(buffer);

  const { width } = await source.metadata();
  // w用于第一次转换 h用于第二次转换
  // 前缀n表示new
  const toBuffers = toImgBufferTypes.map(async ({ width: w, height: h, type }) => {

    if (typeof w === 'number') {
      w = w >= width ? width : w;
    }
    // 由于resize之后不会更新宽高等数据所以先转换成buffer
    // 问题：可能导致内存不足，但是目前issues只有这个解决办法
    const newBuffer = await source.resize({ width: w }).toBuffer();
    // 通过注入buffer 重新得到一个Sharp
    const newSharp = Sharp(newBuffer);

    const { height: nh } = await newSharp.metadata();
    // 判断自动resize 之后的高度是否超出
    if (typeof h === 'number') {
      h = h >= nh ? undefined : h;
    }

    const toBuffer = await newSharp.resize({ width: w, height: h }).toBuffer();
    return {
      buffer: toBuffer,
      type,
    };
  });

  return Promise.all(toBuffers);
};
