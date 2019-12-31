import React from 'react';
import styles from './style.module.scss';
import User from './components/user';
import Image from './components/image';

const Layout = () => {
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
        <Image />
        <div className={styles.tag}>
          <a href="1">掘金相亲</a>
        </div>
      </div>
    </div>
  );
}

export default Layout;