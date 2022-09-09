<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-20 01:54:48
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-20 03:10:17
 * @FilePath     : \web-C-tmp\src\views\login-register\login\qq-login.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="">
        <span id="qqLoginBtn" v-show="false"> </span>
        <g-svg-icon class="w-4 cursor-pointer" name="qq" @click="onQQLogin"></g-svg-icon>
    </div>
</template>

<script lang="ts">
// QQ 登录的 URL
const QQ_LOGIN_URL =
    'https://graph.qq.com/oauth2.0/authorize?client_id=102018351&response_type=token&scope=all&redirect_uri=https://gaojianghua.cn/tianlun'
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
/**
 * QQ登录挂起
 */
onMounted(() => {
    // QC.Login(
    //     {
    //         btnId: 'qqLoginBtn' //插入按钮的节点id
    //     },
    //     (data: any, opts: any) => {}
    // )
})
/**
 * QQ登录按钮事件
 */
const onQQLogin = () => {
    openQQWindow()
}
/**
 * 处理 QQ 登录视窗
 */
const openQQWindow = () => {
    window.open(
        QQ_LOGIN_URL,
        'oauth2Login_10609',
        'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
    )
}
</script>

<style lang="scss" scoped></style>
