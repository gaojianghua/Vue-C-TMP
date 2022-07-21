<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-21 19:31:29
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-21 19:35:50
 * @FilePath     : \web-C-tmp\src\views\home\components\menu\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="py-2 h-[80vh] flex flex-col">
        <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">所以分类</h2>
        <ul class="overflow-y-scroll">
            <li
                v-for="(item, i) in categorys"
                :key="i"
                class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
                @click="$emit('onItemClick', i)"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
    categorys: {
        type: Array<any>,
        required: true
    }
})
defineEmits(['onItemClick'])
</script>

<style lang="scss" scoped></style>
