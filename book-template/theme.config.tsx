import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import {Anchor} from './components/Anchor'
function Test(props: any, deprecatedLegacyContext?: any): React.ReactElement {
  return
  (<div>
    hi
  </div>)
}
const config: DocsThemeConfig = {
  logo: <span>DUM_DEV</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'http://localhost:3000',
    icon: 
    <div className=''>  
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.652 3.45506L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.5449 7.34795M16.652 3.45506C16.652 3.45506 16.7331 4.83379 17.9497 6.05032C19.1662 7.26685 20.5449 7.34795 20.5449 7.34795M16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9M20.5449 7.34795L17.5625 10.3304M14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L10.1 15.5876M10.1 15.5876L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.41242 13.9M10.1 15.5876L8.41242 13.9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M22.75 12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12H22.75ZM12 2.75C12.4142 2.75 12.75 2.41421 12.75 2C12.75 1.58579 12.4142 1.25 12 1.25V2.75ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75C2.75 6.89137 6.89137 2.75 12 2.75V1.25ZM6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114ZM1.25 12C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25Z" fill="#1C274C"/>
      </svg>
    </div>,
  },
  editLink:{
    component: function EditLink({ className, filePath, children }) { 

      function parseUrl(url) {
        // Split the URL by '/' to break it into parts
        const parts = url.split('/');
        if(parts.lenght > 2) {
          const topic = parts[1]; // This is 'ARC'
          const title = parts[2]// This will be "Test-it's-working-Super.mdx"
          return { topic, title: title.replace('.mdx', '') };
        } else if(parts.length === 2) {
          const topic = "/" // This is 'ARC'
          const title = parts[1]// This will be "Test-it's-working-Super.mdx"
          return { topic, title: title.replace('.mdx', '') };
        } else if(parts.length ===1){
          console.log(parts)
          const topic = "/" // This is 'ARC'
          const title = "index"
          return { topic, title: title.replace('.mdx', '') };
        }
      }
      
      const {topic, title} = parseUrl(filePath)
      const baseUrl = 'http://localhost:3000'
      const editUrl = baseUrl+`&topic=${topic}&title=${title}`

      if (!editUrl) { 
        return null 
      } 
      return ( 
        <Anchor className={className} href={editUrl}> 
          {children} 
        </Anchor> 
      )},
      text: 'Edit this page'
  },
  darkMode: true,
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template',
  },
 
}

export default config;