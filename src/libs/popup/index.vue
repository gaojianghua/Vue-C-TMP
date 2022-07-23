<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-21 18:39:19
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-21 19:07:00
 * @FilePath     : \web-C-tmp\src\libs\popup\src\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div>
        <teleport to="body">
            <!-- 蒙板 -->
            <transition name="fade">
                <div
                    @click="isVisable = false"
                    v-if="isVisable"
                    class="h-screen w-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
                ></div>
            </transition>
            <!-- 内容 -->
            <transition name="popup-down-up">
                <div
                    v-if="isVisable"
                    v-bind="$attrs"
                    class="w-screen bg-white z-50 fixed bottom-0"
                >
                    <slot />
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import {
    useScrollLock,
    useVModel
} from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
    modelValue: {
        required: true,
        type: Boolean
    }
})
defineEmits(['update:modelValue'])
// 是一个响应式数据, 当 isVisable 值发送变化时, 会自动触发 emit 修改modelValue
const isVisable = useVModel(props)
// 锁定滚动
const isLocked = useScrollLock(document.body)
watch(
    isVisable,
    (val) => {
        isLocked.value = val
    },
    { immediate: true }
)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.popup-down-up-enter-active,
.popup-down-up-leave-active {
    transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
    transform: translateY(100%);
}
</style>
