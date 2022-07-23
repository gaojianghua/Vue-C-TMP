import { createApp } from 'vue'
import './styles/index.scss'
import router from './router'
import App from './App.vue'
import { useREM } from './utils/flexible'
import { createPinia } from 'pinia'
import GaoUI from './components/index'
import GaoLibs from './libs/index'
import 'virtual:svg-icons-register'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
useREM()
const app = createApp(App)
app.use(router)
app.use(GaoUI)
app.use(GaoLibs)
app.use(pinia)

app.mount('#app')