'use client'
import React, {useState} from 'react';
import Link from 'next/link';
import config from '@/config';
import styles from './Header.module.css';
import SendIcon from './SVGs/SendIcon';
import InformationIcon from './SVGs/InformationIcon';
import HistoryIcon from './SVGs/HistoryIcon';
import Library from './SVGs/Library';
const ToggleSideBar = () => {
  return (
    <div>

    </div>
  )
}

const ClickAbleToolLinkButtion = ({canClick, icon, baseUrl, arg}) => {
  return (
    <>
      {
        canClick ?
        (<Link className="block bg-white font-black font-sm rounded-full p-2 m-2 shadow-inner" key={"a"} href={`${baseUrl}/${arg}`} passHref>
          {icon}
        </Link>)
        :
        (<div className="block bg-gray-100 font-black font-sm rounded-full p-2 shadow-inner" placeholder="Make article, No history" key={baseUrl}>
          {icon}
        </div>)
      }
    </>

  )
}

const submitMarkdown = async () => {
  const value = await localStorage.getItem("markdown") || "";
  console.log(value)
  return value
}

const Header = ({ SubmitFunc }) => {

  const [menuToggle, setMenuToggle] = useState(false);
  const [markdownId, setMakrdownId] = useState(undefined);
  
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
      <div className="flex w-24 justify-between">
      <div className='bg-blue-400 text-xs font-mono m-0 pl-2 pt-0.5 pb-0.5 text-white flex items-center pr-1 hover:bg-sky-700 checked:bg-sky-700 transition-all duration-300 ease-in-out rounded-full'>
              <Link href="/submitmdx">
               SAVE
              </Link> 
              <div className='p-1'>
                <SendIcon/>
              </div>
      </div>
      <div className='m-0 p-0 flex items-center '>
          <label className=' flex items-center'>
            <input className='toggleSideBar relative right-0 top-0' type="checkbox" id="toggleSidebar" />
            <span >
              <img src={config.logoUrl} alt="Logo" className="w-4 h-4 rounded-full overflow-visible hover:bg-sky-700 checked:bg-sky-700 transition-all duration-300 ease-in-out"/>
            </span>
           
            <div id="sidebarMenu" className="fixed top-0 right-0 h-full w-30 h-[50vh] rounded-full mr-3 mt-[25vh] bg-wood-darkbrown bg-cover shadow-inner -translate-x-0 transition-transform duration-300 ease-in-out mt-16">

              {/* <div id="sidebarMenu" className="fixed top-0 right-0 h-full w-30 h-[50vh] rounded-full mr-3 mt-[25vh] bg-gradient-to-b from-pink-500 to-blue-700 transform -translate-x-0 transition-transform duration-300 ease-in-out mt-16"> */}
                <div class="p-4">
                     <ul class="mt-6">
                        <ClickAbleToolLinkButtion canClick={markdownId !== undefined ? false : true} icon={<HistoryIcon/>} baseUrl={"history"} arg="asfdasfdafsafsdfsfsfasdf"/>
                        <ClickAbleToolLinkButtion canClick={true} icon={<Library/>} baseUrl={"library"} arg=""/>
                        <ClickAbleToolLinkButtion canClick={markdownId !== undefined ? false : true} icon={<HistoryIcon/>} baseUrl={"history"} arg="asfdasfdafsafsdfsfsfasdf"/>
                        <ClickAbleToolLinkButtion canClick={true} icon={<InformationIcon/>} baseUrl={"usermanual"} arg=""/>
                    </ul>
                </div>
              </div>
          </label>

      </div>  
      </div>
     
    </header>
  );
};

export default Header;