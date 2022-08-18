<template>
    <div class='page'>
        <slot>
            <p class="text-sm">
                {{ showTime }}
            </p>
        </slot>
    </div>
</template>

<script lang="ts">
// 倒计时结束
const EMITS_FINISH = 'finish'
// 倒计时改变
const EMITS_CHANGE = 'change'
// 倒计时的时间间隔
const INTERVAL_COUNT = 1000
</script>

<script setup lang='ts'>
import { computed, onUnmounted, ref, watch } from 'vue'
import dayjs from './utils'

const props = defineProps({
    // 毫秒时间
    time: {
        type: Number,
        required: true
    },
    // 遵循 dayjs format 格式
    format: {
        type: String,
        default: 'HH:mm:ss'
    }
})
const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])

// 倒计时时长
const duration = ref<number>(0)

/**
 * 开始倒计时
 */
let interval: number
const start = () => {
    close()
    interval = window.setInterval(() => {
        durationFn()
    }, INTERVAL_COUNT)
}
/**
 * 倒计时的执行行为
 */
const durationFn = () => {
    duration.value -= INTERVAL_COUNT
    emits(EMITS_CHANGE)
    // 监听结束行为
    if (duration.value <= 0) {
        duration.value = 0
        emits(EMITS_FINISH)
        close()
    }
}
/**
 * 倒计时结束 
 */
const close = () => {
    if (interval) {
        clearInterval(interval)
    }
}

/**
 * 组件销毁时, 清理倒计时
 */
onUnmounted(() => {
    close()
})
/**
 * 开始倒计时
 */
watch(() => props.time, (val: number) => {
    duration.value = val
    start()
}, { immediate: true })

/**
 * 显示的时间格式
 */
const showTime = computed(() => {
    return dayjs.duration(duration.value).format(props.format)
})
</script>

<style lang='scss' scoped>
</style>