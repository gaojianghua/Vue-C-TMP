<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-19 11:05:52
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-22 14:08:41
 * @FilePath     : \web-C-tmp\src\views\layout\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="h-screen">
        <header-vue class="h-herader"></header-vue>
        <div class="h-main">
            <main-vue></main-vue>
        </div>
        <floating-vue></floating-vue>
    </div>
</template>

<script setup lang="ts">
import headerVue from './components/header/index.vue'
import mainVue from './components/main/index.vue'
import floatingVue from './components/floating/index.vue'
import { ref } from 'vue'
</script>

<style lang="scss" scoped></style>
