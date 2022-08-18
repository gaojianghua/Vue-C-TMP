<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-21 19:31:29
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-23 21:11:09
 * @FilePath     : \web-C-tmp\src\views\home\components\menu\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="py-2 h-[80vh] flex flex-col">
        <h2 class=" text-base text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">所有分类</h2>
        <ul class="overflow-y-scroll">
            <li
                v-for="(item, i) in categorys"
                :key="i"
                class=" text-sm text-zinc-900 dark:text-zinc-300 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:active:bg-zinc-900"
                @click="$emit('onItemClick', i)"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
const { categorys } = useStore().common
defineEmits(['onItemClick'])
</script>

<style lang="scss" scoped></style>
