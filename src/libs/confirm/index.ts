/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-11 17:25:40
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-11 17:25:42
 * @FilePath     : \web-C-tmp\src\libs\confirm\index.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */

import { h, render } from 'vue'
import confirmComponent from './index.vue'
/**
 * @description  : confirm组件
 * @param         {*} title 标题 (若用户未传递内容, 标题即为内容)
 * @param         {*} content 内容 (若没有title, content作为第一个参数传入)
 * @param         {*} cancelText 取消按钮文本
 * @param         {*} confirmText 确定按钮文本
 * @return        {*} Promise
 */
export const confirm = (
    content: string,
    title?: string,
    cancelText?: string,
    confirmText?: string
) => {
    return new Promise<void>((resolve, reject) => {
        if (title && !content) {
            content = title
            title = ''
        }
        // 关闭的回调
        const close = () => {
            render(null, document.body)
        }
        // 取消按钮的回调
        const cancelHandler = () => {
            reject(new Error('取消按钮被点击'))
        }
        // 确定按钮的回调
        const confirmHandler = () => {
            resolve()
        }
        // 生成vnode
        const vnode = h(confirmComponent, {
            title,
            content,
            cancelText,
            confirmText,
            cancelHandler,
            confirmHandler,
            close
        })
        // render
        render(vnode, document.body)
    })
}
