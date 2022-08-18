<script setup lang="ts">
import useStore from './store';
</script>

<template>
    <!-- 一级路由出口 -->
    <div class="h-screen fixed top-0 left-0 w-screen">
        <!-- <router-view></router-view> -->
        <g-transition-router-view mainComponentName="home" :routerType="useStore().common.routerType">
        </g-transition-router-view>
    </div>
</template>
