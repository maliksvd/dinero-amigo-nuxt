// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxt/ui', '@nuxt/eslint', 'nuxt-time'],

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }
  },

  // ESLint
  eslint: {
    config: {
      stylistic: true
    }
  },

  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm'
    }
  }
})
