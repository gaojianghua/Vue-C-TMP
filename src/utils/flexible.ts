import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '../constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备, 判断依据屏幕宽度是否小于一个指定宽度 (1280)
 */
export const isMobileTerminal = computed(() => {
    return width.value < PC_DEVICE_WIDTH
})

/**
 * 动态指定 rem 基准值, 最大为40px
 * 根据用户屏幕宽度, 计算出来的值赋值给 html 根标签作为 fontsize的大小
 */
export const useREM = () => {
    const MAX_FONT_SIZE = 40
    document.addEventListener('DOMContentLoaded', () => {
        const html = document.querySelector('html')
        let fontSize = window.innerWidth / 10
        fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
        html!.style.fontSize = fontSize + 'px'
    })
}
