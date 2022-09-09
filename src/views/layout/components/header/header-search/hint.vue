<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-04 10:54:40
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-11 13:50:23
 * @FilePath     : \web-C-tmp\src\views\layout\components\header\header-search\hint.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="">
        <div
            v-for="(item, i) in hintData"
            :key="i"
            class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
            v-html="highlightText(item)"
            @click="onItemClick(item)"
        ></div>
    </div>
</template>

<script lang="ts">
const EMITS_ITEM_CLICK = 'itemClick'
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { pexelsApi } from '@/api/index'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
    // 搜索文本
    searchText: {
        type: String,
        required: true
    }
})
const emits = defineEmits([EMITS_ITEM_CLICK])

// 处理搜索提示数据获取
const hintData = ref([])
const getHintData = async () => {
    if (!props.searchText) return
    const { data, code } = await pexelsApi.getHint({ p: props.searchText })
    if (code === 200) {
        hintData.value = data
    }
}

// watch 可以监听一个 ref 响应式数据, 获取一个 包含 getter 的函数
watchDebounced(() => props.searchText, getHintData, {
    immediate: true,
    debounce: 500
})

// item 点击事件处理
const onItemClick = (item: string) => {
    emits(EMITS_ITEM_CLICK, item)
}
// 处理关键字高亮
const highlightText = (text: string) => {
    // 生成高亮标签
    const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
    // 正则表达式: 从显示文本中匹配用户输入的文本
    const reg = new RegExp(props.searchText, 'gi')
    // 替换
    return text.replace(reg, highlightStr)
}
</script>

<style lang="scss" scoped></style>
