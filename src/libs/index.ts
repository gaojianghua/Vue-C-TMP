import { App, Component, defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index'
export { message } from './message/index'

export default {
    install(app: App) {
        const components = import.meta.glob('./*/index.vue')
        for (const [fullPath, fn] of Object.entries(components)) {
            const componentName = 'g-' + fullPath.replace('./', '').split('/')[0]
            app.component(componentName, defineAsyncComponent<any>(fn))
        }
    }
}
