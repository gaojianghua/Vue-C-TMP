<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-22 14:17:44
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-11 14:24:43
 * @FilePath     : \web-C-tmp\src\views\layout\components\header\header-search\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="w-full guide-search">
        <g-search v-model="inputValue" @search="onSearchHandler">
            <template #dropdown>
                <div>
                    <!-- 搜索提示 -->
                    <hint-vue
                        :searchText="inputValue"
                        v-show="inputValue"
                        @itemClick="onSearchHandler"
                    ></hint-vue>
                    <!-- 历史记录 -->
                    <history-vue v-show="!inputValue" @itemClick="onSearchHandler"></history-vue>
                    <!-- 推荐主题 -->
                    <theme-vue v-show="!inputValue"></theme-vue>
                </div>
            </template>
        </g-search>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/store'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import themeVue from './theme.vue'

const inputValue = ref('')
// 搜索回调
const onSearchHandler = (val: string) => {
    inputValue.value = val
    if (val) {
        useStore().user.addHistory(val)
        useStore().common.changeSearchText(val)
    }
}
</script>

<style lang="scss" scoped></style>
