import { watch } from 'vue'
import useStore from '@/store'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'

// 监听系统主题变更
let matchMedia: any
const watchSystemThemeChange = () => {
    // 仅需一次初始化
    if (matchMedia) return
    matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    // 监听主题变化
    matchMedia.onchange = () => {
        changeTheme(THEME_SYSTEM)
    }
}
// 变更主题
const changeTheme = (val: any) => {
    let themeClassName = ''
    switch (val) {
        case THEME_LIGHT:
            themeClassName = 'light'
            break
        case THEME_DARK:
            themeClassName = 'dark'
            break
        case THEME_SYSTEM:
            watchSystemThemeChange()
            themeClassName = matchMedia.matches ? 'dark' : 'light'
            break
        default:
            break
    }
    document.querySelector('html')!.className = themeClassName
}
// 初始化主题
export default () => {
    watch(() => useStore().common.theme, changeTheme, { immediate: true })
}
