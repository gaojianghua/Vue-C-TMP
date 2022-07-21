import { createApp } from 'vue'
import './styles/index.scss'
import router from './router'
import App from './App.vue'
import { useREM } from './utils/flexible'
import { createPinia } from 'pinia'
import GaoUI from './components/index'
import GaoLibs from './libs/index'
import 'virtual:svg-icons-register'

useREM()
const app = createApp(App)
app.use(router)
app.use(GaoUI)
app.use(GaoLibs)
app.use(createPinia())

app.mount('#app')