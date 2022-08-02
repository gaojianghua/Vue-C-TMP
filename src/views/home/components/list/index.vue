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
        <g-infinite
            v-model="loading"
            :isFinished="isFinished"
            @onLoad="getPexelsData"
        >
            <g-waterfall
                class="px-1 w-full"
                :data="list"
                nodeKey="id"
                :column="isMobileTerminal ? 2 : 5"
                :picturePreReading="false"
            >
                <template v-slot="{ item, width }">
                    <item-vue :data="item" :width="width"></item-vue>
                </template>
            </g-waterfall>
        </g-infinite>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { pexelsApi } from '@/api'
import itemVue from './item.vue'
import { IList } from '@/types'
import { isMobileTerminal } from '@/utils/flexible'
import { listData } from '@/ject/list'
import useStore from '@/store'
const {
    currentCategory
} = useStore().common

const loading = ref(false)
const isFinished = ref(false)

// 请求数据
const list = ref<IList[]>([])
let query = {
    page: 1,
    size: 20,
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
</script>

<style lang="scss" scoped></style>
