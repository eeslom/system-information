import { appDescription } from './app/constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],

  colorMode: {
    classSuffix: ''
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.svg', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  serverHandlers: [
    {
      route: '/api/hono',
      handler: '~~/backend/hono.ts',
      middleware: true,
    },
  ],

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  vite: {
    vue: {
      features: {
        optionsAPI: false
      }
    }
  },
  css: ['~/css/tailwind.css'],
  googleFonts: {
    families: {
      Montserrat: [400, 500, 600, 700],
    },
  },

  shadcn: {
    componentDir: '~/components',
    prefix: '',
  },

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },
  
  future: {
    compatibilityVersion: 4
  }
})
