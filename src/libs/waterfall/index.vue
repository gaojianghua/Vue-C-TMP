<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-24 16:24:22
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-25 17:42:57
 * @FilePath     : \web-C-tmp\src\libs\waterfall\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div
        class="relative"
        ref="containerTarget"
        :style="{
            height: containerHeight + 'px',
        }"
    >
        <!-- 数据渲染 -->
        <template v-if="columnWidth && data.length">
            <div
                v-for="(item, index) in data"
                :key="nodeKey ? item.id : index"
                class="g-waterfall-item absolute duration-300"
                :style="{
                    width: columnWidth + 'px',
                    left: item._style?.left + 'px',
                    top: item._style?.top + 'px',
                }"
            >
                <slot :item="item" :width="columnWidth" :index="index"></slot>
            </div>
        </template>
        <!-- 加载中的提示 -->
        <div v-else>加载中...</div>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
    PropType,
    ref,
    watch,
    nextTick,
    onUnmounted,
} from 'vue'
import { IList } from '@/types'
import {
    getAllImg,
    getImgElements,
    getMinHeightColumn,
    onComplateImgs,
    getMinHeight,
    getMaxHeight,
} from './utils'

const props = defineProps({
    // 数据源
    data: {
        type: Array as PropType<IList[]>,
        required: true,
    },
    // 唯一标识
    nodeKey: {
        type: String,
    },
    // 列数
    column: {
        type: Number,
        default: 2,
    },
    // 列间距
    columnSpacing: {
        type: Number,
        default: 20,
    },
    // 行间距
    rowSpacing: {
        type: Number,
        default: 20,
    },
    // 是否需要进行图片预读取
    picturePreReading: {
        type: Boolean,
        default: true,
    },
})
// 容器的高度
const containerHeight = ref(0)
// 记录每列高度的容器
const columnHeightObj: any = ref({})
// 构建记录每列高度的对象
const useColumnHeightObj = () => {
    columnHeightObj.value = {}
    for (let i = 0; i < props.column; i++) {
        columnHeightObj.value[i] = 0
    }
}
// 容器实例
const containerTarget = ref<HTMLElement>()
// 容器总宽度
const containerWidth = ref(0)
// 容器的左边距
const containerLeft = ref(0)
// 计算容器总宽度
const useContainerWidth = () => {
    let { paddingLeft, paddingRight } = getComputedStyle(
        containerTarget.value!,
        null
    )
    paddingLeft = paddingLeft.replace('px', '')
    paddingRight = paddingRight.replace('px', '')
    containerLeft.value = parseInt(paddingLeft)
    containerWidth.value =
        containerTarget.value!.offsetWidth -
        parseInt(paddingLeft) -
        parseInt(paddingRight)
}
// 列宽
const columnWidth = ref(0)
// 列间距的合计
const columnSpacingTotal = computed(() => {
    return (props.column - 1) * props.columnSpacing
})
// 计算列宽
const useColumnWidth = () => {
    useContainerWidth()
    columnWidth.value =
        (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
    useColumnWidth()
})
// item 高度集合
let itemHeights: number[] = []
// 监听图片加载完成
const waitImgComplate = () => {
    itemHeights = []
    let itemElements = Array.from(
        document.getElementsByClassName('g-waterfall-item')
    ) as HTMLElement[]
    const imgElements = getImgElements(itemElements)
    const allImgs = getAllImg(imgElements)
    onComplateImgs(allImgs).then(() => {
        itemElements.forEach((el: HTMLElement) => {
            itemHeights.push(el.offsetHeight)
        })
        useItemLoction()
    })
}
// 不需要图片预加载
const useItemHeight = () => {
    itemHeights = []
    let itemElements = Array.from(
        document.getElementsByClassName('g-waterfall-item')
    ) as HTMLElement[]
    itemElements.forEach((el: HTMLElement) => {
        itemHeights.push(el.offsetHeight)
    })
    useItemLoction()
}

// 渲染位置
const useItemLoction = () => {
    // 遍历数据源
    props.data.forEach((item, index) => {
        // 避免重复计算
        if (item._style) {
            return
        }
        // 生成_style属性
        item._style = {}
        item._style.left = getItemLeft()
        item._style.top = getItemTop()
        increasingHeight(index)
    })

    // 指定容器的高度
    containerHeight.value = getMaxHeight(columnHeightObj.value)
}

// 组件销毁
onUnmounted(() => {
    props.data.forEach((item) => {
        delete item._style
    })
})

// 返回下一个 item 的left
const getItemLeft = () => {
    const column: number = Number(getMinHeightColumn(columnHeightObj.value))
    return (
        column * (columnWidth.value + props.columnSpacing) + containerLeft.value
    )
}
// 返回下一个 item 的top
const getItemTop = () => {
    return getMinHeight(columnHeightObj.value)
}

// 指定列高度自增
const increasingHeight = (index: number) => {
    const minHeightColumn: string = getMinHeightColumn(columnHeightObj.value)!
    columnHeightObj.value[minHeightColumn] +=
        itemHeights[index] + props.rowSpacing
}

// 触发计算
watch(
    () => props.data,
    (val) => {
        nextTick(() => {
            // 第一次获取数据时, 构建高度记录容器
            const resetColumnHeight = val.every((item) => !item._style)
            if (resetColumnHeight) {
                // 构建高度记录容器
                useColumnHeightObj()
            }
            if (props.picturePreReading) {
                waitImgComplate()
            } else {
                useItemHeight()
            }
        })
    },
    {
        deep: true,
        immediate: true,
    }
)
// 重新构建瀑布流
const reset = () => {
    setTimeout(() => {
        // 重新计算列宽
        useColumnWidth()
        // 重置所有的定位数据
        props.data.forEach((item) => {
            item._style = null
        })
    }, 200)
}
// 监听列数变化
watch(
    () => props.column,
    () => {
        if (props.picturePreReading) {
            columnWidth.value = 0
            reset()
        } else {
            reset()
        }
    }
)
</script>

<style lang="scss" scoped></style>
