import lazy from './modules/lazy'
import { App } from 'vue'

export default {
    install(app: App) {
        app.directive('lazy', lazy)
        const directives = import.meta.globEager('./modules/*.ts')
        for (const [key, value] of Object.entries(directives) as any) {
            const arr = key.split('/')
            const directiveName = arr[arr.length - 1].replace('.ts', '')
            app.component(directiveName, value.default)
        }
    }
}
