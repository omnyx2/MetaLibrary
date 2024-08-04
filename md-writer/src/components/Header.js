import React from 'react';
import Link from 'next/link';
import config from '@/config';
import styles from './Header.module.css';
 
const Header = ({ title }) => {
  return (
    <header className={`${styles.header} ${styles['sticky-header']}`}>
      <div className={styles.left}>
        <Link href="/">
          <img src={config.goBackIcon} alt="Logo" className={styles.logoLeft} />
        </Link>
      </div>

      <div className={styles.middle}>
        <h1> - META WRITER - </h1>
      </div>
      <div className={styles.right}>
        <img src={config.logoUrl} alt="Logo" className={styles.logoRight} />
      </div>
 
    </header>
  );
};

export default Header;