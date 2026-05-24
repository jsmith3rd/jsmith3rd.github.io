import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { installAnalytics } from './lib/analytics'

const app = createApp(App)

installAnalytics(app)

app.mount('#app')
