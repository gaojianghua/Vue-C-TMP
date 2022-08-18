<template>
    <div 
    ref="containerTarget"
    class=" h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-none">
        <navigation-vue />
        <div class=" max-w-screen-xl mx-auto relative m-1 xl:mt-4">
            <list-vue></list-vue>
        </div>
        <!-- 移动端下的 tabbar -->
        <g-trigger-menu v-if="isMobileTerminal" class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
            <g-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">
                首页
            </g-trigger-menu-item>
            <g-trigger-menu-item v-if="useStore().user.token" icon="vip" iconClass="fill-zinc-400 dark:fill-zinc-500"
                textClass="text-zinc-400 dark:fill-zinc-500" @click="onVIPClick">
                VIP
            </g-trigger-menu-item>
            <g-trigger-menu-item icon="profile" iconClass="fill-zinc-400 dark:fill-zinc-500"
                textClass="text-zinc-400 dark:fill-zinc-500" @click="onMyClick">
                {{ useStore().user.token ? '我的' : '登录' }}
            </g-trigger-menu-item>
        </g-trigger-menu>
    </div>
</template>

<script lang="ts">
export default {
    name: 'home'
}
</script>

<script setup lang='ts'>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { onActivated, ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import useStore from '@/store'
import router from '@/router'
import { useScroll } from '@vueuse/core'

// vip 点击事件
const onVIPClick = () => {
    // 配置跳转方式
    useStore().common.changeRouterType('push')
    router.push('/member')
}
// 点击我的事件
const onMyClick = () => {
    // 配置跳转方式
    useStore().common.changeRouterType('push')
    if (useStore().user.token) {
        router.push('/profile')
    } else {
        router.push('/login')
    }
}
// 记录滚动
const containerTarget = ref<HTMLElement>()
const { y: containerTargetScrollY } = useScroll(containerTarget)
// 被缓存的组件再次可见会回调 onActivated 方法
onActivated(() => {
    if (!containerTarget.value) {
        return
    }
    containerTarget.value.scrollTop = containerTargetScrollY.value
})
</script>

<style lang='scss' scoped>
</style>