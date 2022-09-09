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
export interface ILogin {
    username: string
    password: string
    loginType: 'username' | 'qq' | 'weixin'
}
export interface IRegister {
    username: string
    password: string
    confirmPassword: string
}
export interface IStylesItem {
    icon: string
    color: string
    fillClass: string
    textClass: string
    containerClass: string
}
export interface IStyles {
    warn: IStylesItem
    error: IStylesItem
    success: IStylesItem
}
