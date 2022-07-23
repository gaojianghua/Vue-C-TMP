<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-19 11:05:52
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-23 22:19:12
 * @FilePath     : \web-C-tmp\src\views\home\components\navigation\pc\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="bg-white sticky top-0 left-0 w-full z-10">
        <ul
            class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] pt-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
            :class="[isOpenCategory ? 'h-[90px]' : 'h-[50px]']"
        >
            <li
                v-for="(item, i) in categorys"
                :key="item.id"
                class="shrink-0 px-1.5 z-10 duration-200 text-zinc-800 text-base font-bold h-3 leading-3 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
                :class="{
                    'text-zinc-900 bg-zinc-200': currentCategoryIndex === i
                }"
                @click="onItemClick(i)"
            >
                {{ item.name }}
            </li>
            <!-- 展示箭头 -->
            <div
                class="absolute right-0 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
                @click="triggerState"
            >
                <g-svgIcon
                    :name="[isOpenCategory ? 'fold' : 'unfold']"
                    class="w-1 h-1"
                    fillClass="fill-zinc-900"
                ></g-svgIcon>
            </div>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/store'
const { categorys } = useStore().common

// 状态切换处理
const isOpenCategory = ref<boolean>(false)
const triggerState = () => {
    isOpenCategory.value = !isOpenCategory.value
}
// 选中状态处理
const currentCategoryIndex = ref<number>(0)
const onItemClick = (index: number) => {
    currentCategoryIndex.value = index
}
</script>

<style lang="scss" scoped></style>
