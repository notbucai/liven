import React from 'react';
import styles from './style.module.scss';
const Navigation = () => {
  return (
    <div className={styles.nav}>
      <ul className={styles.list}>
        <li>推荐</li>
        <li>热门</li>
        <li>关注</li>
      </ul>
      <ul className={styles.list}>
        <li>推荐是谁</li>
        <li>热门公司</li>
        <li>New关注</li>
        <li>夏季防晒</li>
      </ul>
    </div>
  );
}

export default Navigation;
