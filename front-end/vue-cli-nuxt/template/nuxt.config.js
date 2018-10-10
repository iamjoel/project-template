module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt 服务器端渲染 Demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [ // 每个页面都会引的css
    '~/assets/reset.css',
    'css-utils-collection',
    '~/assets/common.css',
  ],
  loading: { color: '#3B8070' },
  build: {
 
    extend (config, { isDev, isClient }) {
      
    }
  }
}

