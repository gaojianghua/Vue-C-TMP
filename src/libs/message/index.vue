<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-12 15:22:08
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-12 15:38:05
 * @FilePath     : \web-C-tmp\src\libs\message\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <transition name="down">
        <div
            v-show="isVisable"
            class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
            :class="styles[type as keyof typeof styles].containerClass"
        >
            <g-svg-icon
                :color="styles[type as keyof typeof styles].color"
                :name="styles[type as keyof typeof styles].icon"
                :fillClass="styles[type as keyof typeof styles].fillClass"
                class="h-1.5 w-1.5 mr-1.5"
            >
            </g-svg-icon>
            <span class="text-sm" :class="styles[type as keyof typeof styles].textClass">
                {{ content }}
            </span>
        </div>
    </transition>
</template>

<script lang="ts">
const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'
const typeEnum = [SUCCESS, WARN, ERROR]
</script>
<script setup lang="ts">
import { IStyles, IStylesItem } from '@/types'
import { Style } from 'util'
import { onMounted, ref } from 'vue'
import GSvgIcon from '../svg-icon/index.vue'

const props = defineProps({
    // message 的消息类型
    type: {
        type: String,
        required: true,
        validator(val: string) {
            const result = typeEnum.includes(val)
            if (!result) {
                throw new Error(`你的 type 必须是 ${typeEnum.join('、')} 中的一个`)
            }
            return result
        }
    },
    // 消息内容
    content: {
        type: String,
        required: true
    },
    // 展示时长
    duration: {
        type: Number
    },
    // 关闭的回调
    destory: {
        type: Function
    }
})
// 样式表数据
const styles: IStyles = {
    // 警告
    warn: {
        icon: 'warn',
        color: '#dca550',
        fillClass: 'fill-warn-300',
        textClass: 'text-warn-300',
        containerClass: 'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
    } as IStylesItem,
    // 错误
    error: {
        icon: 'error',
        color: '#f3471c',
        fillClass: 'fill-error-300',
        textClass: 'text-error-300',
        containerClass: 'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
    } as IStylesItem,
    // 成功
    success: {
        icon: 'success',
        color: '#7ec050',
        fillClass: 'fill-success-300',
        textClass: 'text-success-300',
        containerClass: 'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
    } as IStylesItem
}
// 控制显示
const isVisable = ref<boolean>(false)
// 关闭动画执行时间
const duration = '0.5s'
// 为了保证动画展示, 需要在 mounted 之后进行展示
onMounted(() => {
    isVisable.value = true
    setTimeout(() => {
        isVisable.value = false
        setTimeout(() => {
            if (props.destory) {
                props.destory()
            }
        }, parseInt(duration.replace('0.', '').replace('s', '')) * 100)
    }, props.duration)
})
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
    transition: all v-bind(duration);
}

.down-enter-from,
.down-leave-to {
    opacity: 0;
    transform: translate3d(-50%, -100px, 0);
}
</style>
