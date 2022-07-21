import { App, defineAsyncComponent } from 'vue'

export default {
    install(app: App) {
        const components = import.meta.glob('./*/index.vue')
        for (const [fullPath, fn] of Object.entries(components)) {
            const componentName =
                'g-' + fullPath.replace('./', '').split('/')[0]
            app.component(componentName, defineAsyncComponent<any>(fn))
        }
    }
}
