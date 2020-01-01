import React, { useState } from 'react';
import styles from './style.module.scss';

interface IProp {
  list: string[]
}
interface IMaxImageProp extends IProp {
  setClickIndex: Function,
  initIndex: number,
}

interface IImageListProp extends IProp {
  setClickIndex: Function,
  list: string[],
}

const ShowMaxImage = ({ initIndex = 0, setClickIndex }: IMaxImageProp) => {
  const [index, setIndex] = useState(initIndex);
  return (<div className={styles.imageshow}>
    <div className={styles['action-bar']}>
      <div className={[styles['action-item']].join(' ')} onClick={() => setClickIndex(-1)}>
        <i className={['iconfont', 'iconsuoxiao'].join(' ')}></i>
        <span className="full_mini_node">收起</span>
      </div>
      <div className={styles['action-item']}>
        <i className={['iconfont', 'iconfangda'].join(' ')}></i>
        <span className="full_mini_node">查看大图</span>
      </div>
      <div className={styles['action-item']}>
        <i className={['iconfont', 'iconxinlingshouyewuicon-'].join(' ')}></i>
        <span className="full_mini_node">向左旋转</span>
      </div>
      <div className={styles['action-item']}>
        <i className={['iconfont', 'iconxinlingshouyewuicon-1'].join(' ')}></i>
        <span className="full_mini_node">向右旋转</span>
      </div>
    </div>
    <div className={styles.imgshow_box}>
      <div className={[styles.action, styles.left].join(' ')}>
        <i className={['iconfont iconb-'].join(' ')}></i>
      </div>
      {/* TODO 通过 index 选择显示第几张 */}
      <img onClick={() => setClickIndex(-1)} src="https://i0.hdslb.com/bfs/archive/2428736670ced88ccca39a4995702fcc8444bb00.jpg@560w_350h_100Q_1c.webp" alt="" />

      <div className={[styles.action, styles.right].join(' ')}>
        <i className={['iconfont iconb-1'].join(' ')}></i>
      </div>
    </div>
    <div className={[styles.imgminlist].join(' ')}>
      <img className={[styles.imgminitem, styles.active].join(' ')} src="https://user-gold-cdn.xitu.io/2018/11/27/16754380a4c1a096?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1" alt="" />
      <img className={styles.imgminitem} src="https://user-gold-cdn.xitu.io/2018/11/27/16754380a4c1a096?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1" alt="" />
      <img className={styles.imgminitem} src="https://user-gold-cdn.xitu.io/2018/11/27/16754380a4c1a096?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1" alt="" />
    </div>
  </div>);
};
const ImageList = ({ setClickIndex }: IImageListProp) => {
  return (
    <div className={[styles.imagebox, styles['img-c3']].join(' ')}>
      <img className={styles['img-item']} onClick={() => setClickIndex(0)} src="https://user-gold-cdn.xitu.io/2018/11/27/16754380a4c1a096?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1" alt="" />
      <img className={styles['img-item']} onClick={() => setClickIndex(1)} src="https://user-gold-cdn.xitu.io/2018/11/27/16754380a4c1a096?imageView2/1/w/200/h/280/q/95/format/webp/interlace/1" alt="" />
      <img className={styles['img-item']} onClick={() => setClickIndex(2)} src="https://user-gold-cdn.xitu.io/2016/11/29/230b892859eae6b564aecd459e681728?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
      <img className={styles['img-item']} onClick={() => setClickIndex(3)} src="https://user-gold-cdn.xitu.io/2019/4/12/16a0f3d1145c7cc6?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
      <img className={styles['img-item']} onClick={() => setClickIndex(4)} src="https://user-gold-cdn.xitu.io/2019/9/4/16cfa3d03cb5d6cd?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
      <img className={styles['img-item']} onClick={() => setClickIndex(5)} src="https://user-gold-cdn.xitu.io/2019/12/4/16ed055cb3bf0ddb?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
      <img className={styles['img-item']} onClick={() => setClickIndex(6)} src="https://user-gold-cdn.xitu.io/2019/10/6/16d9efe6533786db?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1" alt="" />
    </div>
  );
}

const Image = ({ list }: IProp) => {
  const [index, setIndex] = useState(-1);
  return (
    <div className={styles.image}>
      {
        index >= 0
          ?
          <ShowMaxImage initIndex={index} list={[]} setClickIndex={setIndex} />
          :
          <ImageList list={[]} setClickIndex={setIndex} />
      }
    </div>
  );
}

export default Image;
