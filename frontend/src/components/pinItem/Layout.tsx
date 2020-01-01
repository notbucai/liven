import React from 'react';
import styles from './style.module.scss';
import User from './components/user';
import Image from './components/image';

const Layout = () => {
  const picList = [
    {
      "createTime": "2019-12-04T06:48:34.755Z",
      "_id": "5de756eb31a32073dbe67a5d",
      "user": "5de097b2f966bb59c0ee195f",
      "url": "7cf307e94b8f86e25e9197ef0032934b",
    },
    {
      "createTime": "2019-12-04T06:48:34.755Z",
      "_id": "5de756eb31a32073dbe67a5d",
      "user": "5de097b2f966bb59c0ee195f",
      "url": "7cf307e94b8f86e25e9197ef0032934b",
    },
  ];
  return (
    <div className={styles.pin}>
      <User />
      <div className={styles.content}>
        <span>
          {
            `这个需求很简单！！！
这个需求很紧急！！！
这个需求很严重！！！
s这个需求今晚要上线！！！`
          }
        </span>
      </div>
      <div className={styles.main}>
        <Image list={[]} />
        <div className={styles.tag}>
          <a href="1">掘金相亲</a>
        </div>
      </div>
    </div>
  );
}

export default Layout;