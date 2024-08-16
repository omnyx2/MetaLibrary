import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
const Test = (): React.ReactNode => {
  return
  (<div>
    hi
  </div>)
}
const config: DocsThemeConfig = {
  logo: <span>DT Sensors</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'http://localhost:3001/',
    icon: <Test />,
  },
  darkMode: true,
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template',
  },
 
}

export default config;