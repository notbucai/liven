import React from 'react';

import Navigation from './components/navigation';
import PinItem from '../../components/pinItem'
import styles from './style.module.scss';

const Layout = () => {
  return (
    <div className={'container ' + styles.pin}>
      <div className={styles.left}>
        <Navigation />
      </div>
      <div className={styles.content}>
        <PinItem />
      </div>
    </div>
  );
}

export default Layout;
