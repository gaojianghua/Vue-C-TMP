<template>
    <div
        class="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40"
        ref="containerTarget"
    >
        <div>
            <!-- 搜索图标 -->
            <g-svgIcon
                name="search"
                class="w-2 h-2 absolute duration-500 translate-y-[-50%] top-[50%] left-2"
                color="#707070"
            ></g-svgIcon>
            <!-- 输入框 -->
            <input
                class="block text-sm w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 focus:border-red-300 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700"
                type="text"
                placeholder="搜索"
                v-model="inputValue"
                @keyup.enter="onSearchHandler"
                @focus="onFocusHandler"
                @blur="onBlurHandler"
            />
            <!-- 删除按钮 -->
            <g-svgIcon
                v-show="inputValue"
                name="delete"
                class="w-2 h-2 cursor-pointer absolute duration-500 translate-y-[-50%] top-[50%] right-8"
                color="#707070"
                @click="onClearClick"
            >
            </g-svgIcon>
            <!-- 分割线 -->
            <div
                class="opacity-0 group-hover:opacity-100 h-2 w-[1px] absolute translate-y-[-50%] top-[50%] right-[66px] duration-500 bg-zinc-200"
            ></div>
            <!-- 搜索按钮 -->
            <g-button
                class="absolute opacity-0 duration-500 group-hover:opacity-100 translate-y-[-50%] top-[50%] right-1 rounded-full"
                icon="search"
                @click="onSearchHandler"
            ></g-button>
        </div>
        <!-- 下拉区 -->
        <transition name="slide">
            <div
                v-if="$slots.dropdown"
                v-show="isFocus"
                class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl"
            >
                <slot name="dropdown" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
// 双向绑定
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// 搜索
const EMIT_SEARCH = 'search'
// 删除所有文本
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点
const EMIT_FOCUS = 'focus'
// 失去焦点
const EMIT_BLUR = 'blur'
</script>

<script setup lang="ts">
import { useVModel, onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        required: true,
        type: String,
    },
})

const emits = defineEmits([
    EMIT_UPDATE_MODELVALUE,
    EMIT_SEARCH,
    EMIT_CLEAR,
    EMIT_INPUT,
    EMIT_FOCUS,
    EMIT_BLUR,
])
// 文本内容
const inputValue = useVModel(props)
// 监听输入行为
watch(inputValue, (val: string) => {
    emits(EMIT_INPUT, val)
})
// 清空搜索文本
const onClearClick = () => {
    inputValue.value = ''
    emits(EMIT_CLEAR)
}
// 搜索
const onSearchHandler = () => {
    emits(EMIT_SEARCH, inputValue.value)
}
// 是否获取到焦点
const isFocus = ref(false)
// 触发获取焦点
const onFocusHandler = () => {
    isFocus.value = true
    emits(EMIT_FOCUS)
}
// 失去焦点
const onBlurHandler = () => {
    emits(EMIT_BLUR)
}
// 下拉框展示控制
const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
    isFocus.value = false
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(40px);
}
</style>
