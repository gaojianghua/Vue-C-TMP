<template>
    <div class="relative leading-[0px]">
        <!-- 单行 -->
        <input
            class="border-gray-200 dark:first-letter:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
            v-if="type === TYPE_TEXT"
            type="text"
            v-model="text"
            :maxlength="max"
        />
        <!-- 多行 -->
        <textarea
            class="border-gray-200 dark:first-letter:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border outline-0 py-1 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
            v-if="type === TYPE_TEXTAREA"
            v-model="text"
            rows="5"
            :maxlength="max"
        ></textarea>
        <!-- 最大长度 -->
        <span
            v-if="max"
            class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
            :class="{ 'text-red-700': currentNumber === parseInt(String(max)) }"
            >{{ currentNumber }} / {{ max }}</span
        >
    </div>
</template>

<script lang="ts">
// 单行文本
const TYPE_TEXT = 'text'
// 多行文本
const TYPE_TEXTAREA = 'textarea'
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
    // v-model
    modelValue: {
        type: String,
        required: true
    },
    // type
    type: {
        type: String,
        default: TYPE_TEXT,
        validator(value: string) {
            const arr = [TYPE_TEXT, TYPE_TEXTAREA]
            const result = arr.includes(value)
            if (!result) {
                throw new Error(`type 的值必须在可选范围内 [${arr.join('、')}]`)
            }
            return result
        }
    },
    // max
    max: [Number, String]
})
defineEmits(['update:modelValue'])
// 输入的字符
const text = useVModel(props)

// 输入的字符数
const currentNumber = computed(() => {
    return String(text.value).length
})
</script>

<style lang="scss" scoped></style>
