<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-25 17:50:34
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-25 19:30:19
 * @FilePath     : \web-C-tmp\src\libs\infinite\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="page">
        <!-- 内容 -->
        <slot></slot>
        <div ref="loadingTarget" class="h-6 py-4 flex items-center">
            <!-- 加载更多 -->
            <g-svgIcon
                v-if="loading"
                class="w-4 h-4 mx-auto animate-spin"
                name="infinite-load"
                fillClass="fill-zinc-800"
            ></g-svgIcon>
            <!-- 没有更多数据 -->
            <p v-if="isFinished" class="text-center text-base text-zinc-400">
                已经没有更多数据了
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
    // 是否处于加载状态
    modelValue: {
        type: Boolean,
        required: true,
    },
    // 数据是否加载完成
    isFinished: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

// 处理loading状态
const loading = useVModel(props)
// 滚动的元素
const loadingTarget = ref(null)
// 记录当前是否在底部
const targetIsIntersecting = ref(false)
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
    targetIsIntersecting.value = isIntersecting
    emitLoad()
})
// 触发 load 事件
const emitLoad = () => {
    setTimeout(() => {
        if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
            loading.value = true
            emits('onLoad')
        }
    }, 200)
}
// 监听loading变化, 解决数据加载完成后, 首屏未铺满问题
watch(loading, emitLoad)
</script>

<style lang="scss" scoped></style>
