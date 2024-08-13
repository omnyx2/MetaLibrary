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
          <label>
            <input className='toggleSideBar relative right-0 top-0' type="checkbox" id="toggleSidebar" />
            <span >
              <img src={config.logoUrl} alt="Logo" className="w-4 h-4 rounded-full overflow-visible hover:bg-sky-700 checked:bg-sky-700 transition-all duration-300 ease-in-out"/>
            </span>
            <div id="sidebarMenu" className="fixed top-0 right-0 h-full w-30 h-[50vh] rounded-full mr-3 mt-[25vh] bg-wood-darkbrown bg-cover shadow-inner -translate-x-0 transition-transform duration-300 ease-in-out mt-16">

              {/* <div id="sidebarMenu" className="fixed top-0 right-0 h-full w-30 h-[50vh] rounded-full mr-3 mt-[25vh] bg-gradient-to-b from-pink-500 to-blue-700 transform -translate-x-0 transition-transform duration-300 ease-in-out mt-16"> */}
                <div class="p-6">
                     <ul class="mt-6">
                        <li class="mb-4"><a href="#" className="block bg-white font-black font-sm rounded-full p-2 shadow-inner">HI</a></li>
                        <li class="mb-4"><a href="#" className="block bg-white font-black font-sm rounded-full p-2 shadow-inner">HI</a></li>
                        <li class="mb-4"><a href="#" className="block bg-white font-black font-sm rounded-full p-2 shadow-inner">HI</a></li>
                        <li class="mb-4"><a href="#" className="block bg-white font-black font-sm rounded-full p-2 shadow-inner">HI</a></li>
                    </ul>
                </div>
              </div>
          </label>

      </div>  
    </header>
  );
};

export default Header;