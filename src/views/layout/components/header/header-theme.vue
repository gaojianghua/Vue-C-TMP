<template>
    <g-popover placement="bottom-left">
        <!-- 具名插槽 -->
        <template #reference>
            <div>
                <g-svg-icon
                    :name="svgIconName"
                    class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                ></g-svg-icon>
            </div>
        </template>
        <!-- 匿名插槽 -->
        <div class="w-[140px] p-1 overflow-hidden">
            <div
                v-for="item in themeArr"
                :key="item.id"
                class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
                @click="onItemClick(item)"
            >
                <g-svg-icon
                    :name="item.icon"
                    class="w-1.5 h-1.5 mr-1"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                >
                </g-svg-icon>
                <span class="text-zinc-900 text-sm dark:text-zinc-300">{{ item.name }}</span>
            </div>
        </div>
    </g-popover>
</template>

<script setup lang="ts">
import { THEME_DARK, THEME_SYSTEM, THEME_LIGHT } from '@/constants'
import useStore from '@/store'
import { computed } from 'vue'

interface IThemeItem {
    id: number
    type: string
    icon: string
    name: string
}

const themeArr: IThemeItem[] = [
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
// 切换主题
const onItemClick = (item: IThemeItem) => {
    useStore().common.setTheme(item.type)
}
// 展示图标
const svgIconName = computed(() => {
    const findTheme = themeArr.find((item) => {
        return item.type === useStore().common.theme
    })
    return findTheme?.icon
})
</script>

<style lang="scss" scoped></style>
