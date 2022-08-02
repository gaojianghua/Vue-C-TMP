/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-26 10:55:20
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-26 11:06:26
 * @FilePath     : \web-C-tmp\src\directives\modules\lazy.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */
import { useIntersectionObserver } from '@vueuse/core'

export default {
    mounted(el: any) {
        // 拿到当前 img 的 src
        const imgSrc = el.src
        // 把 src 置空
        el.src = ''

        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
                // 当图片可见时加载图片
                el.src = imgSrc
                // 停止监听
                stop()
            }
        })
    },
}
