import React from 'react';
import styles from './style.module.scss';

const Image = () => {
  return (
    <div className={styles.image}>
      <div className={[styles.imagebox, styles['img-c1']].join(' ')}>
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2019/12/6/16eda4c57aeb1dd5?imageView2/1/w/260/h/260/q/85/format/jpg/interlace/1" alt="" />
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2019/12/6/16eda4c90fed2bb1?imageView2/1/w/260/h/260/q/85/format/jpg/interlace/1" alt="" />
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2019/12/6/16eda4cb3d688478?imageView2/1/w/260/h/260/q/85/format/jpg/interlace/1" alt="" />
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2019/11/11/16e59a6bc562bc45?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2016/11/29/230b892859eae6b564aecd459e681728?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2019/4/12/16a0f3d1145c7cc6?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2019/9/4/16cfa3d03cb5d6cd?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2019/12/4/16ed055cb3bf0ddb?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" />
        <img className={styles['img-item']} src="https://user-gold-cdn.xitu.io/2019/10/6/16d9efe6533786db?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1" alt="" />
      </div>
      <div className={styles.imageshow}>
        <div className={styles['action-bar']}>
          <div className={[styles['action-item']].join(' ')}>
            <i className={['iconfont', 'iconsuoxiao'].join(' ')}></i>
            <span>收起</span>
          </div>
          <div className={styles['action-item']}>
            <i className={['iconfont', 'iconfangda'].join(' ')}></i>
            <span>查看大图</span>
          </div>
          <div className={styles['action-item']}>
            <i className={['iconfont', 'iconxinlingshouyewuicon-'].join(' ')}></i>
            <span>向左旋转</span>
          </div>
          <div className={styles['action-item']}>
            <i className={['iconfont', 'iconxinlingshouyewuicon-1'].join(' ')}></i>
            <span>向右旋转</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image;
