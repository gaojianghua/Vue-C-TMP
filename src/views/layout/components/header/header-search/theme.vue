<template>
    <div>
        <div class="text-xs mb-1 text-zinc-400">
            热门精选
        </div>
        <div class="flex h-[140px]" v-if="themeData.list.length">
            <!-- 大图 -->
            <div class="relative rounded w-[260px] cursor-pointer" :style="{
                backgroundColor: randomRGB()
            }">
                <img v-lazy class="h-full w-full object-cover rounded" :src="themeData.big.photo" alt="">
                <p
                    class=" absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none">
                    # {{ themeData.big.title }}
                </p>
            </div>
            <!-- 小图 -->
            <div class="flex flex-1 flex-wrap max-w-[860px]">
                <div v-for="item in themeData.list" :key="item.id"
                    class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded">
                    <img v-lazy class="w-full h-full object-cover rounded" :src="item.photo" alt="">
                    <p
                        class="backdrop-blur absolute top-0 left-0 w-full h-full flex items-center px-1 rounded cursor-pointer duration-300 hover:backdrop-blur-none">
                        # {{ item.title }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { pexelsApi } from '@/api'
import { randomRGB } from '@/utils/color'

interface STheme {
    id: number
    title: string
    photo: string
}

const themeData = ref({
    big: <STheme>{},
    list: <STheme[]>[]
})
// 获取热门精选数据
const getThemeData = async () => {
    const { data, code } = await pexelsApi.getThemes()
    if (code === 200) {
        themeData.value = {
            big: data[0],
            list: data.splice(1, data.length)
        }
    }
}
getThemeData()
</script>

<style lang='scss' scoped>
</style>