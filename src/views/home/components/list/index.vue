<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-24 15:26:35
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-26 13:03:35
 * @FilePath     : \web-C-tmp\src\views\home\components\list\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div>
        <g-infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexelsData">
            <g-waterfall
                class="px-1 w-full"
                :data="list"
                nodeKey="id"
                :column="isMobileTerminal ? 2 : 5"
                :picturePreReading="false"
            >
                <template v-slot="{ item, width }">
                    <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
                </template>
            </g-waterfall>
        </g-infinite>
        <!-- 详情内容展示 -->
        <transition :css="false" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
            <pins-vue v-if="isVisiablePins" :id="currentPins.id"></pins-vue>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pexelsApi } from '@/api'
import itemVue from './item.vue'
import { IList } from '@/types'
import { isMobileTerminal } from '@/utils/flexible'
import { listData } from '@/ject/list'
import useStore from '@/store'
import pinsVue from '@/views/pins/components/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'

const { currentCategory, searchText } = useStore().common

const loading = ref(false)
const isFinished = ref(false)

// 请求数据
const list = ref<IList[]>([])
let query = {
    page: 1,
    size: 20
}
const getPexelsData = () => {
    // 数据全部加载完 return
    if (isFinished.value) return
    // 完成了第一次请求, 后续的请求让page自增
    if (list.value.length) {
        query.page += 1
    }

    setTimeout(() => {
        if (query.page === 1) {
            console.log(listData)
            list.value = JSON.parse(JSON.stringify(listData))
        } else {
            let id = list.value[list.value.length - 1].id
            JSON.parse(JSON.stringify(listData)).forEach((item: any) => {
                item.id = id++
                list.value.push(item)
            })
            console.log(list.value)
        }
        loading.value = false
    }, 1000)

    // 触发接口请求
    // const { data, code } = await pexelsApi.getData(query)
    // if (code === 200) {
    //     if (query.page === 1) {
    //         list.value = data.data
    //     } else {
    //         list.value.push(...data.data)
    //     }
    // }
    // 判断数据是否全部加载完成
    // if (list.value.length === data.total) {
    //     isFinished.value = true
    // }
    // 修改loading标记
}
// // 修改query,重新发起请求
// const resetQuery = (newQuery: any) => {
//     query = { ...query, ...newQuery }
//     // 重置状态
//     isFinished.value = false
//     list.value = []
// }
// // 监听 currentCategory 的变化
// watch(
//     () => currentCategory,
//     (val) => {
//         resetQuery({
//             page: 1,
//             categoryId: val.id
//         })
//     }
// )
// 监听 searchText 变化
// watch(
//     () => searchText,
//     (val) => {
//         resetQuery({
//             page: 1,
//             searchText: val
//         })
//     }
// )

// 控制pins展示
const isVisiablePins = ref<boolean>(false)
// 保存当前选中项
const currentPins = ref<any>({})

// 监听浏览器后退事件
useEventListener(window, 'popstate', () => {
    isVisiablePins.value = false
})

// 进入Pins详情
const onToPins = (item: any) => {
    // 接收三个参数state, title, url
    history.pushState(null, '', `/pins/${item.id}`)
    isVisiablePins.value = true
    currentPins.value = item
}
const beforeEnter = (el: any) => {
    gsap.set(el, {
        scaleX: 0,
        scaleY: 0,
        transformOrigin: '0 0',
        translateX: currentPins.value.location?.translateX,
        translateY: currentPins.value.location?.translateY,
        opacity: 0
    })
}
const enter = (el: any, done: any) => {
    gsap.to(el, {
        direction: 0.3,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        opacity: 1,
        onComplete: done
    })
}

const leave = (el: any, done: any) => {
    gsap.to(el, {
        direction: 0.3,
        scaleX: 0,
        scaleY: 0,
        translateX: currentPins.value.location?.translateX,
        translateY: currentPins.value.location?.translateY,
        opacity: 0,
        onComplete: done
    })
}
</script>

<style lang="scss" scoped></style>
