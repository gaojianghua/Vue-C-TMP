<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-24 15:26:43
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-12 15:04:13
 * @FilePath     : \web-C-tmp\src\views\home\components\list\item.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
        <div
            class="relative w-full rounded cursor-zoom-in group"
            :style="{
                backgroundColor: randomRGB()
            }"
            @click="onToPinsClick"
        >
            <!-- 图片 -->
            <img
                v-lazy
                ref="imgTaget"
                class="w-full rounded bg-transparent"
                :src="data.photo"
                alt=""
                :style="{
                height: (width! / data.photoWidth) * data.photoHeight + 'px'
            }"
            />
            <!-- 遮罩层 -->
            <div
                class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
            >
                <!-- 分享 -->
                <g-button class="absolute top-1.5 left-1.5">分享</g-button>
                <!-- 点赞 -->
                <g-button
                    class="absolute top-1.5 right-1.5"
                    type="info"
                    icon="heart"
                    iconClass="fill-zinc-900 dark:fill-zinc-200"
                ></g-button>
                <!-- 下载 -->
                <g-button
                    class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
                    size="small"
                    type="info"
                    icon="download"
                    iconClass="fill-zinc-900 dark:fill-zinc-200"
                    @click="onDownload"
                ></g-button>
                <!-- 全屏 -->
                <g-button
                    class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
                    size="small"
                    type="info"
                    icon="full"
                    iconClass="fill-zinc-900 dark:fill-zinc-200"
                    @click="onImgFullscreen"
                ></g-button>
            </div>
        </div>
        <!-- 标题 -->
        <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
            {{ data.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
            <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
            <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { randomRGB } from '@/utils/color'
import { saveAs } from 'file-saver'
import { message } from '@/libs'
import { useElementBounding, useFullscreen } from '@vueuse/core'

const props = defineProps({
    // 数据
    data: {
        type: Object,
        required: true
    },
    // 宽度
    width: {
        type: Number
    }
})

const emits = defineEmits(['click'])

// 下载按钮点击事件
const onDownload = () => {
    message('success', '图片开始下载')
    // 延迟一段时间执行, 可以得到更好的体验
    setTimeout(() => {
        // 接收一个下载图片的链接
        saveAs(props.data.photoDownLink)
    }, 100)
}
// 生成全屏的方法
const imgTaget = ref(null)
const { enter: onImgFullscreen } = useFullscreen(imgTaget)

// Pins 跳转记录, 记录图片的中心点(X | Y 位置 + 宽 | 高 一半)
const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerWidth,
    height: imgContainerHeight
} = useElementBounding(imgTaget)
const imgContainerCenter = computed(() => {
    return {
        translateX: parseInt(String(imgContainerX.value + imgContainerWidth.value / 2)),
        translateY: parseInt(String(imgContainerY.value + imgContainerHeight.value / 2))
    }
})

// 进入详情点击事件
const onToPinsClick = () => {
    emits('click', {
        id: props.data.id,
        location: imgContainerCenter.value
    })
}
</script>

<style lang="scss" scoped></style>
