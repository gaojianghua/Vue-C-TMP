<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-19 11:05:52
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-23 21:10:58
 * @FilePath     : \web-C-tmp\src\views\home\components\navigation\mobile\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="bg-white sticky top-0 left-0 z-10">
        <ul
            ref="ulTarget"
            class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
        >
            <li
                ref="sliderTarget"
                :style="sliderStyle"
                class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
            ></li>
            <li
                @click="onShowPopup"
                class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
            >
                <g-svgIcon class="w-1.5 h-1.5" name="vite"></g-svgIcon>
            </li>
            <li
                v-for="(item, i) in categorys"
                :key="i"
                class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
                :class="{ 'text-zinc-100': currentCategoryIndex === i }"
                :ref="setItemRef"
                @click="onItemClick(i)"
            >
                {{ item.name }}
            </li>
        </ul>
        <g-popup v-model="isVisable">
            <Menu @on-item-click="onItemClick"></Menu>
        </g-popup>
    </div>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, ref, watch } from 'vue'
import Menu from '@/views/home/components/menu/index.vue'
import useStore from '@/store'
const { categorys } = useStore().common
// 滑块
const sliderStyle = ref({
    transform: 'translateX(0px)',
    width: '52px'
})
// 选中 item 下标
const currentCategoryIndex = ref(0)
// 获取所有的 item 元素
let itemRefs: any = []
const setItemRef = (el: any) => {
    if (el) {
        itemRefs.push(el)
    }
}
// 数据改变之后, DOM变化之前
onBeforeUpdate(() => {
    itemRefs = []
})
// 获取 ul 元素
const ulTarget = ref()
// 通过 vueuse -> useScroll 获取响应式的 scroll 滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget)
// watch 监听
watch(
    () => currentCategoryIndex.value,
    (val) => {
        const { left, width } = itemRefs[val].getBoundingClientRect()
        sliderStyle.value = {
            transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
            width: width + 'px'
        }
    }
)
// item 点击事件
const onItemClick = (i: number) => {
    currentCategoryIndex.value = i
    isVisable.value = false
}
// 控制弹出层
const isVisable = ref(false)
const onShowPopup = () => {
    isVisable.value = true
}
</script>
