import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import emitter from "@/plugins/emitter"
import WeatherIcon from "@/plugins/weather-icon"
import './utils/cssGlobalVarsOnWindowResize'
import './registerServiceWorker'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(emitter)
app.use(WeatherIcon)
app.mount('#app')