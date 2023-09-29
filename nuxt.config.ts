// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  // modules: [
  //   'nuxt-gtag',
  // ],

  // gtag: {
  //   id: 'G-BHRYGK69JB'
  // },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, initial-scale=1, maximum-scale=1, minimum-scale=0.5',
      link:[
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
          integrity : 'sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: '/css/style.css'
        }
        
       
      ],
      script:[
        {
          src: 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js'
        },
        {
          src: '//code.jivo.ru/widget/rGi3UCjdjO',
          async: true,
        },   
      ]
    }
  }
})
