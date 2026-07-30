import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { articleDatesPlugin } from './plugins/article-dates-plugin'
import { cnamePlugin } from './plugins/cname-plugin'
import { faviconPlugin } from './plugins/favicon-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), faviconPlugin(), cnamePlugin(), articleDatesPlugin()],
})
