<template>
    <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
        <div
            class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4">
            <!-- 移动端 navbar 处理 -->
            <g-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">
                精选会员
            </g-navbar>

            <div class="py-2 px-1">
                <h2 class="text-center text-[34px] font-bold tracking-widest text-yellow-600">
                    精选VIP
                </h2>
                <p class="text-center text-lg text-yellow-500">
                    升级精选VIP，畅想所有内容
                </p>
                <div
                    class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    <pay-menu-item-vue v-for="item in vipPayListData" :key="item.id" :hot="item.isHot"
                        :select="item.id === currentPayData.id" :data="item" @click="onChangeCurrentPay">
                    </pay-menu-item-vue>
                </div>
                <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
                <!-- 支付 -->
                <payment-vue class="mt-4" :payData="currentPayData" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { vipApi } from '@/api'
import { isMobileTerminal } from '@/utils/flexible'
import payMenuItemVue from './components/pay-menu-item.vue';
import paymentVue from './components/payment/index.vue'
import router from '@/router';
import useStore from '@/store';

// vip 种类数据
const vipPayListData = ref<any[]>([])
// 当前选中的值
const currentPayData = ref<any>({})

// 获取 vip 种类数据
const getVIPPayListData = async () => {
    const data = await vipApi.getVipPayList()
    vipPayListData.value = data
    currentPayData.value = vipPayListData.value[0]
}
getVIPPayListData()
// navbar 左侧点击事件
const onNavbarLeftClick = () => {
    useStore().common.changeRouterType('back')
    router.back()
}
// 选中某个 vip 种类的事件
const onChangeCurrentPay = (item: any) => {
    currentPayData.value = item
}
</script>

<style lang='scss' scoped>
</style>