import React from 'react';
import Link from 'next/link';
import config from '@/config';
import styles from './Header.module.css';
import BlinkingCursor from './BlinkingCursor'

const Header = ({ title, toggle }) => {
  return (
    <header className={`${styles.titleHeader}`}>
      <div className={styles.middle}>
        {title} { !toggle && <BlinkingCursor text={""} />  }
      </div>
    </header>
  );
};

export default Header;