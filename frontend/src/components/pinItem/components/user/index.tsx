import React from 'react';
import styles from './style.module.scss';

const User = () => {
  return (
    <div className={styles.user}>
      <div className={styles['account-group']}>
        <div className={styles['user-avatar-box']}>
          <a href="1"><img src="https://user-gold-cdn.xitu.io/2019/7/11/16be09c1a489c6de?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" /></a>
        </div>
        <div className={styles['user-info-box']}>
          <div className={styles['username']}><a href="1">不才</a></div>
          <div className={styles['userinfo']}>啥也不会</div>
        </div>
      </div>
      <div className={styles['user-action']}>
        <button className="subscribe-btn follow-button">关注</button>
      </div>
    </div>
  );
}

export default User;
