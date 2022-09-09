/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-14 22:16:11
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-14 22:24:53
 * @FilePath     : \web-C-tmp\src\views\login-register\validate.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */
// 用户名校验
export const validateUsername: any = (val: String) => {
    if (!val) {
        return '用户名为必填项'
    }
    if (val.length < 3 || val.length > 12) {
        return '用户名应在 3 ~ 12 位之间'
    }
    return true
}
// 密码校验
export const validatePassword: any = (val: String) => {
    if (!val) {
        return '密码为必填项'
    }
    if (val.length < 6 || val.length > 12) {
        return '用户名应在 6 ~ 12 位之间'
    }
    return true
}
// 确认密码校验
export const validateConfirmPassword: any = (valone: String, valtwo: string) => {
    if (valone !== valtwo[0]) {
        return '两次密码不一致'
    }
    return true
}
