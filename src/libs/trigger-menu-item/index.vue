<template>
    <div class="w-5 flex flex-col items-center justify-center mx-0.5" @click="onItemClick">
        <g-svg-icon :name="icon" :fillClass="iconClass" class="w-2 h-2"></g-svg-icon>
        <p class="text-sm mt-0.5" :class="textClass">
            <slot />
        </p>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    iconClass: {
        type: String
    },
    textClass: {
        type: String,
        default: 'text-zinc-900 dark:text-zinc-200'
    },
    to: {
        type: String
    }
})
// 点击事件
const onItemClick = () => {
    if (!props.to) {
        return
    }
    router.push(props.to)
}
</script>

<style lang="scss" scoped></style>
