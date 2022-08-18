import { createApp } from 'vue'
import './styles/index.scss'
import router from './router'
import App from './App.vue'
import { useREM } from './utils/flexible'
import { createPinia } from 'pinia'
import GaoLibs from './libs/index'
import GaoDirs from './directives'
import 'virtual:svg-icons-register'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useTheme from './utils/theme'
import './premission'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router)
app.use(GaoLibs)
app.use(GaoDirs)
app.use(pinia)

useREM()
useTheme()

app.mount('#app')
