<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-19 11:05:52
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-26 12:52:15
 * @FilePath     : \web-C-tmp\src\views\home\components\navigation\pc\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div
        class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500"
    >
        <ul
            class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] pt-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
            :class="[isOpenCategory ? 'h-[90px]' : 'h-[50px]']"
        >
            <li
                v-for="(item, i) in categorys"
                :key="item.id"
                class="shrink-0 px-1.5 z-10 duration-200 text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-3 leading-3 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
                :class="{
                    'text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900':
                        currentCategoryIndex() === i,
                }"
                @click="onItemClick(item)"
            >
                {{ item.name }}
            </li>
            <!-- 展示箭头 -->
            <div
                class="absolute right-0 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
                @click="triggerState"
            >
                <g-svg-icon
                    :name="isOpenCategory ? 'fold' : 'unfold'"
                    class="w-1 h-1"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                ></g-svg-icon>
            </div>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/store'
import { SCategorys } from '@/store/common';
const { categorys, changeCurrentCategory, currentCategoryIndex } =
    useStore().common

// 状态切换处理
const isOpenCategory = ref<boolean>(false)
const triggerState = () => {
    isOpenCategory.value = !isOpenCategory.value
}
// 选中状态处理
//const currentCategoryIndex = ref<number>(0)
const onItemClick = (item: SCategorys) => {
    changeCurrentCategory(item)
}
</script>

<style lang="scss" scoped></style>
