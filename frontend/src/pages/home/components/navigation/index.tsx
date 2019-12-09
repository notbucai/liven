import React from 'react';
import styles from './style.module.scss';
const Navigation = () => {
  return (
    <div className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <a href="1" className={styles.active}>推荐</a>
        </li>
        <li><a href="2">推荐</a></li>
        <li><a href="3">推荐</a></li>
      </ul>
      <ul className={styles.list}>
        <li><a href="3">谢谢推荐</a></li>
        <li><a href="3">阿斯顿飞</a></li>
        <li><a href="3">New是的</a></li>
        <li><a href="3">洒下地方</a></li>
      </ul>
    </div>
  );
}

export default Navigation;
