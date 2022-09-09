/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-26 11:20:58
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-26 11:21:00
 * @FilePath     : \web-C-tmp\src\utils\color.ts
 * @Description  : 生成随机色值
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */
export const randomRGB = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})`
}
