import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
]

const app = createApp(App)
const pinia = createPinia()
const router = createRouter({
    history: createMemoryHistory(),
    routes
})

app.use(pinia)
app.mount('#app')
app.use(autoAnimatePlugin)
app.use(router)
