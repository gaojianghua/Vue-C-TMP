import { App } from 'vue'

const components = [
    
]!

export default {
    install(app: App) {
        components.map((item) => {
            app.use(item)
        })
    }
}