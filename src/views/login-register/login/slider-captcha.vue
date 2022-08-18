<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-14 22:47:22
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-16 03:08:26
 * @FilePath     : \web-C-tmp\src\views\login-register\login\slider-captcha.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div
        class=' fixed z-[60] top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-2xl'>
        <div class="flex items-center h-5 text-left px-1 mb-1">
            <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
            <g-svg-icon name="refresh" fillClass="fill-zinc-200" class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer
            hover:bg-zinc-200 dark:hover:bg-zinc-900" @click="onReset"></g-svg-icon>
            <g-svg-icon name="close" fillClass="fill-zinc-200" class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer
            hover:bg-zinc-200 dark:hover:bg-zinc-900" @click="onClose"></g-svg-icon>
        </div>
        <div id="captcha"></div>
    </div>
</template>

<script lang="ts">
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { sysApi } from '@/api'

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])

/**
 * 使用人类行为验证:
 * 1.创建 captcha 实例
 */
let captcha: any = null
onMounted(() => {
    captcha = sliderCaptcha({
        // 渲染位置
        id: 'captcha',
        // 用户拼图成功之后的回调
        async onSuccess(arr: number[]) {
            // const { data, code } = await sysApi.getCaptchaData({
            //     behavior: arr
            // })
            // if (code === 200) {
            //     emits(EMITS_SUCCESS)
            // }
            emits(EMITS_SUCCESS)
        },
        // 用户拼图失败之后的回调
        onFail() {
            console.log('1')
        },
        // 默认的验证方法
        verify() {
            return true
        }
    })
})

// 重置
const onReset = () => {
    captcha.reset()
}
// 关闭
const onClose = () => {
    emits(EMITS_CLOSE)
}
</script>

<style lang='scss' scoped>
</style>
