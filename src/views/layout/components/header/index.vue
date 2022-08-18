<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-22 14:06:15
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-22 14:06:17
 * @FilePath     : \web-C-tmp\src\views\layout\components\header\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div
        class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
    >
        <div class="flex items-center">
            <img
                v-lazy
                class="guide-home h-4 cursor-pointer mr-2"
                @click="onToHome"
                src="https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/%E7%81%B0%E5%A4%AA%E7%8B%BC.png"
                alt=""
            />
            <header-search-vue class="mr-1"></header-search-vue>
            <header-theme-vue class="mr-1"></header-theme-vue>
            <header-my-vue></header-my-vue>
        </div>
    </div>
</template>

<script setup lang="ts">
import headerMyVue from './header-my.vue'
import headerSearchVue from './header-search/index.vue'
import headerThemeVue from './header-theme.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onToHome = () => {
    router.push('/')
}
</script>

<style lang="scss" scoped></style>
