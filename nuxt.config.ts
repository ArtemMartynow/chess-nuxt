// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@pinia/nuxt'],
  css: ['~/assets/scss/main.scss'],
  app: { 
    head: { 
      title: 'Chess', 
      meta: [ { name: 'description', content: 'Chess' } ] 
    } 
  },
  ssr: true,
})