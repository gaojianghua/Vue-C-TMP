<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-22 14:06:22
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-22 14:06:24
 * @FilePath     : \web-C-tmp\src\views\layout\components\floating\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="fixed bottom-10 right-2">
        <!-- 引导页 -->
        <div class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
            @click="onGuideClick">
            <g-svg-icon name="guide" class="w-2 h-2" fillClass="fill-zinc-900 darl:fill-zinc-200 group-hover:fill-main">
            </g-svg-icon>
        </div>
        <!-- 反馈 -->
        <g-popover class="guide-feedback flex items-center" placement="top-left">
            <template #reference>
                <div
                    class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group">
                    <g-svg-icon name="feedback" class="w-2 h-2"
                        fillClass="fill-zinc-900 darl:fill-zinc-200 group-hover:fill-main"></g-svg-icon>
                </div>
            </template>
            <div class="w-[140px] p-1 overflow-hidden">
                <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800">
                    <g-svg-icon name="feedback" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300">
                    </g-svg-icon>
                    <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
                </div>
            </div>
        </g-popover>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from '../steps'

// 初始化
let driver: any = null
onMounted(() => {
    driver = new Driver({
        allowClose: false,
        closeBtnText: '关闭',
        nextBtnText: '下一步',
        prevBtnText: '上一步'
    })
})
// 开始引导
const onGuideClick = () => {
    // 指定引导步骤
    driver.defineSteps(steps)
    // 开始
    driver.start()
}
</script>

<style lang="scss" scoped>
.driver-fix-stacking {
    position: fixed;
    z-index: 1000004 !important;
}
</style>
