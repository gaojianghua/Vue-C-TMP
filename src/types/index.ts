/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-25 00:16:58
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-25 15:37:05
 * @FilePath     : \web-C-tmp\src\types\index.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */
export interface IList {
    id: number
    tags: string[]
    title: string
    author: string
    authorLike: string
    avatar: string
    photo: string
    photoHeight?: number
    photoWidth?: number
    _style?: any
}
