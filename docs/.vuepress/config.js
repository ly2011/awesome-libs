const glob = require('tiny-glob')
const path = require('path')

const basePath = '/docs/'

const generateCommonSideBar = async (dir = '/') => {
  try {
    let currPath = basePath + dir
    console.log('currPath: ', currPath)
    let files = await glob(`${currPath}/**/*.{js,md}`)
    files = files.filter(file => !file.includes('README.md')).map(file => file.replace('docs', ''))
    console.log('generateCommonSideBar: ', files)
    let sidebars = files.map(file => {
      let baseName = path.basename(file, '.md')
      return [file, baseName]
    })
    return sidebars
  } catch (error) {
    return undefined
  }
}

// generateCommonSideBar('accumulate/')

module.exports = {
  title: '前端常用库',
  description: '整理我平时关注的前端库',
  head: [
    // ['link', { rel: 'icon', href: '/img/logo.ico' }],
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    // ['link', { rel: 'apple-touch-icon', href: '/img/logo.png' }],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;' }
    ]
  ],
  base: '/awesome-libs/',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '前端库', link: '/libs/' },
      { text: '工具', link: '/tools/' },
      { text: '前端积累', link: '/accumulate/' },
      { text: '代码块', link: '/codeBlock/' },
      { text: 'Github', link: 'https://github.com/ly2011/awesome-libs' }
    ],
    // sidebar: { '/accumulate/': [['JS/canvas和img日常转换操作', 'canvas和img日常转换操作']] },
    sidebar: { '/accumulate/': [generateCommonSideBar('accumulate/')] },
    sidebarDepth: 3,
    lastUpdated: '最后更新时间' // 文档更新时间：每个文件git最后提交的时间
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/medium-zoom']
}
