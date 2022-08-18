<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-11 14:39:13
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-11 17:25:28
 * @FilePath     : \web-C-tmp\src\libs\confirm\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div>
        <!-- 蒙版 -->
        <transition name="fade">
            <div v-if="isVisible" class=" w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" @click="close">
            </div>
        </transition>
        <!-- 内容 -->
        <transition name="up">
            <div v-if="isVisible"
                class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
                @click="close">
                <!-- 标题 -->
                <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
                    {{ title }}
                </div>
                <!-- 文本 -->
                <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
                    {{ content }}
                </div>
                <!-- 按钮 -->
                <div class="flex justify-end">
                    <g-button type="info" class="mr-2" @click="onCancelClick">
                        {{ cancelText }}
                    </g-button>
                    <g-button type="primary" @click="onConfirmClick">
                        {{ confirmText }}
                    </g-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import GButton from '../button/index.vue'

const props = defineProps({
    // 标题
    title: {
        type: String,
    },
    // 描述
    content: {
        type: String,
        required: true
    },
    // 取消按钮文本
    cancelText: {
        type: String,
        default: '取消'
    },
    // 确定按钮文本
    confirmText: {
        type: String,
        default: '确定'
    },
    // 取消按钮事件
    cancelHandler: {
        type: Function
    },
    // 确定按钮事件
    confirmHandler: {
        type: Function
    },
    // 关闭 confirm 的回调
    close: {
        type: Function
    }
})

// 控制蒙版显示
const isVisible = ref<boolean>(false)
const show = () => {
    isVisible.value = true
}
// 处理动画 ( render 函数的渲染, 会直接进行 )
onMounted(() => {
    show()
})
// 关闭动画执行时间
const duration = '0.5s'
// 关闭事件
const close = () => {
    isVisible.value = false
    setTimeout(() => {
        if (props.close) {
            props.close()
        }
    }, parseInt(duration.replace('0.', '').replace('s', '')) * 100);
}
// 取消按钮点击事件
const onCancelClick = () => {
    if (props.cancelHandler) {
        props.cancelHandler()
    }
    close()
}
// 确定按钮点击事件
const onConfirmClick = () => {
    if (props.confirmHandler) {
        props.confirmHandler()
    }
    close()
}
</script>

<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.up-enter-active,
.up-leave-active {
    transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
    opacity: 0;
    transform: translate3d(-50%, 100px, 0);
}
</style>