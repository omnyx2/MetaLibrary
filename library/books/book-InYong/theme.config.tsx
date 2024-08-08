import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
const Test = () => {
  return
  (<div>
    hi
  </div>)
}
const config: DocsThemeConfig = {
  logo: <span>InYong</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'http://localhost:3001/',
    icon: 'Edit!'
  },
  darkMode: true,
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template',
  },
 
}

export default config;