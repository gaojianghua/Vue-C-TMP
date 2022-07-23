<template>
    <g-popover placement="bottom-left">
        <!-- 具名插槽 -->
        <template #reference>
            <div>
                <g-svgIcon
                    name="theme-light"
                    class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
                    fillClass="fill-zinc-900"
                ></g-svgIcon>
            </div>
        </template>
        <!-- 匿名插槽 -->
        <div class="w-[140px] overflow-hidden">
            <div
                v-for="item in themeArr"
                :key="item.id"
                class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
            >
                <g-svgIcon
                    :name="item.icon"
                    class="w-1.5 h-1.5 mr-1"
                    fillClass="fill-zinc-900"
                ></g-svgIcon>
                <span class="text-zinc-900 text-sm">{{ item.name }}</span>
            </div>
        </div>
    </g-popover>
</template>

<script setup lang="ts">
import { THEME_DARK, THEME_SYSTEM, THEME_LIGHT } from '@/constants'
import { ref } from 'vue'

const themeArr = [
    {
        id: 1,
        type: THEME_LIGHT,
        icon: 'theme-light',
        name: '极简白'
    },
    {
        id: 2,
        type: THEME_DARK,
        icon: 'theme-dark',
        name: '极夜黑'
    },
    {
        id: 3,
        type: THEME_SYSTEM,
        icon: 'theme-system',
        name: '跟随系统'
    }
]
</script>

<style lang="scss" scoped></style>
