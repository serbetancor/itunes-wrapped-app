import './index.css'

import { createPinia } from 'pinia'
import { type Component, createApp } from 'vue'

import App from './App.vue'
import { createAppRouter } from './router'

const app = createApp(App as Component)

app.use(createPinia())
app.use(createAppRouter())
app.mount('#app')
