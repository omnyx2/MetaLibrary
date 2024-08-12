'use client'
import React, {useState} from 'react';
import Link from 'next/link';
import config from '@/config';
import styles from './Header.module.css';
 

const ToggleSideBar = () => {
  return (
    <div>

    </div>
  )
}

const Header = ({ from }) => {

  const [menuToggle, setMenuToggle] = useState(false);
  

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
      </div>
      <div className="lnline-block">
          <input className='toggleSideBar absolute right-0 top-0' type="checkbox" id="toggleSidebar" />
          <img src={config.logoUrl} alt="Logo" className={styles.logoRight} />
          <div id="sidebarMenu" className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-pink-500 to-blue-700 transform -translate-x-0 transition-transform duration-300 ease-in-out mt-16">
            <div class="p-6">
                <h1 class="text-2xl font-semibold">Sidebar</h1>
                <ul class="mt-6">
                    <li class="mb-4"><a href="#" class="block">Home</a></li>
                    <li class="mb-4"><a href="#" class="block">About</a></li>
                    <li class="mb-4"><a href="#" class="block">Services</a></li>
                    <li class="mb-4"><a href="#" class="block">Contact</a></li>
                </ul>
            </div>
          </div>
      </div>  
    </header>
  );
};

export default Header;