import type { NuxtPage } from 'nuxt/schema'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vue-echarts']
  },
  app: {
    head: {
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-GQ20PVVE6Y', async: true },
        { src: '/clearity.microsoft.js' },
        { src: '/google.analytics.js' }]
    }
  },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@vueuse/nuxt'
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/',
      include: ['/accounts(/*)?'],
      exclude: [],
      cookieRedirect: false
    }
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  hub: {
    database: true
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  runtimeConfig: {
    appid: '',
    secret: '',
    cbEnv: '',
    geminiProjectId: ''
  },
  hooks: {
    'pages:extend': function (pages) {
      // 删除含component的page路由
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = []
        for (const page of pages) {
          if (pattern.test(page.file || ''))
            pagesToRemove.push(page)

          else
            removePagesMatching(pattern, page.children)
        }
        for (const page of pagesToRemove)
          pages.splice(pages.indexOf(page), 1)
      }
      removePagesMatching(/component|tools/i, pages)
    }
  }
})
