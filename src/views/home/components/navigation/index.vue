<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-19 11:05:52
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-23 21:29:06
 * @FilePath     : \web-C-tmp\src\views\home\components\navigation\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <mobile-navigation-vue v-if="isMobileTerminal" />
    <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<script setup lang="ts">
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import useStore from '@/store'
// 获取数据
// useStore().common.getCategorys()
</script>

<style lang="scss" scoped></style>
