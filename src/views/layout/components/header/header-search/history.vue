<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-11 14:05:45
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-11 17:09:08
 * @FilePath     : \web-C-tmp\src\views\layout\components\header\header-search\history.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class=''>
        <div class="flex items-center text-xs mb-1 text-zinc-400">
            <span>最新搜索</span>
            <g-svg-icon name="all-delete"
                class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
                fillClass="fill-zinc-400" @click="onDeleteAllClick">
            </g-svg-icon>
        </div>
        <div class="flex flex-wrap">
            <div v-for="(item, index) in useStore().user.historys" :key="index"
                class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
                @click="onItemClick(item)">
                <span>{{ item }}</span>
                <g-svg-icon name="delete" class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
                    @click.stop="onDeleteClick(index)">
                </g-svg-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
const EMITS_ITEM_CLICK = 'itemClick'
</script>

<script setup lang='ts'>
import { ref } from 'vue'
import useStore from '@/store';
import { confirm } from '@/libs';

const emits = defineEmits([EMITS_ITEM_CLICK])

// 清空历史记录
const onDeleteAllClick = () => {
    confirm('提示', '你要删除所有记录吗?', '取消', '确定')
        .then(() => {
            useStore().user.deleteAllHistory()
        })
        .catch(() => {
            console.log('点击了取消')
        })
}
// 删除单个历史记录
const onDeleteClick = (i: number) => {
    confirm('提示', '你要删除此记录吗?', '取消', '确定')
        .then(() => {
            useStore().user.deleteHistory(i)
        })
        .catch(() => {
            console.log('点击了取消')
        })
}
// 点击历史记录触发搜索
const onItemClick = (item: string) => {
    emits(EMITS_ITEM_CLICK, item)
}
</script>

<style lang='scss' scoped>
</style>