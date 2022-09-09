import { h, render } from 'vue'
import messageComponent from './index.vue'

/**
 * @description  :
 * @param         {string} type 类型: success warn error
 * @param         {string} content 描述文本
 * @param         {string} duration 展示时间(毫秒), ,默认3000
 * @return        {Promise} Promise
 */
export const message = (type: string, content: string, duration: number = 3000) => {
    return new Promise<void>((resolve, reject) => {
        // 动画结束时的回调
        const onDestory = () => {
            render(null, document.body)
        }
        // 生成vnode
        const vnode = h(messageComponent, {
            type,
            content,
            duration,
            destory: onDestory
        })
        // render
        render(vnode, document.body)
    })
}
