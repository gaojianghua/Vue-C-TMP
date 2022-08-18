<template>
    <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
        <div ref="referenceTarget">
            <!-- 具名插槽: 触发弹层的视图 -->
            <slot name="reference" />
        </div>
        <!-- 气泡展示 -->
        <transition name="slide">
            <div ref="contentTarget" v-if="isViable"
                class="absolute z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
                :style="contentStyle">
                <!-- 匿名插槽: 弹出层视图中的内容 -->
                <slot />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
// 延迟关闭的时间
const DEAL_TIME = 300
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'
// 方位数组
const placementEnum = [
    PROP_TOP_LEFT,
    PROP_TOP_RIGHT,
    PROP_BOTTOM_LEFT,
    PROP_BOTTOM_RIGHT
]
</script>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
    // 控制气泡弹出位置
    placement: {
        type: String,
        default: PROP_BOTTOM_LEFT,
        validator(val: string) {
            const result = placementEnum.includes(val)
            if (!result) {
                throw new Error(
                    `你的 placement 必须是 ${placementEnum.join('、')} 中的一个`
                )
            }
            return result
        }
    }
})

// 控制气泡展示
const isViable = ref(false)

// 鼠标移入
let timeout: any
const onMouseenter = () => {
    isViable.value = true
    if (timeout) {
        clearTimeout(timeout)
    }
}

// 鼠标移出
const onMouseleave = () => {
    timeout = setTimeout(() => {
        isViable.value = false
        timeout = null
    }, DEAL_TIME);
}

// 计算元素的尺寸
const referenceTarget = ref<HTMLElement>()
const contentTarget = ref<HTMLElement>()
const useElementSize = (target: HTMLElement) => {
    if (!target) return {}
    return {
        width: target.offsetWidth,
        height: target.offsetHeight
    }
}
// 气泡样式
interface IContentStyle {
    top: number | string
    left: number | string
}
const contentStyle = ref<IContentStyle>({
    top: 0,
    left: 0
})
// 计算
watch(isViable, (val: boolean) => {
    if (!val) return
    nextTick(() => {
        switch (props.placement) {
            case PROP_TOP_LEFT:
                contentStyle.value.top = 0
                contentStyle.value.left =
                    -useElementSize(contentTarget.value!).width! + 'px'
                break
            case PROP_TOP_RIGHT:
                contentStyle.value.top = 0
                contentStyle.value.left =
                    useElementSize(referenceTarget.value!).width! + 'px'
                break
            case PROP_BOTTOM_LEFT:
                contentStyle.value.top =
                    useElementSize(referenceTarget.value!).height! + 'px'
                contentStyle.value.left =
                    -useElementSize(contentTarget.value!).width! + 'px'
                break
            case PROP_BOTTOM_RIGHT:
                contentStyle.value.top =
                    useElementSize(referenceTarget.value!).height + 'px'
                contentStyle.value.left =
                    useElementSize(referenceTarget.value!).width + 'px'
                break
            default:
                break
        }
    })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
