// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", 'nuxt-mdi'],
  app: {
    head: {
      script: [
        // { src: '/js/jquery.min.js', type: 'text/javascript' },
      ],
    },
  },
  // Not working, need to find out why.
  mdi: {
    cache: false,
    componentName: 'MdiIcon',
    defaultSize: '5rem'
  },
})