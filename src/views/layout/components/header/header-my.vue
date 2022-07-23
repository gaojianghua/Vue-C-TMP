<template>
    <g-popover class="flex items-center" placement="bottom-left">
        <!-- 具名插槽 -->
        <template #reference>
            <div
                class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
            >
                <!-- 用户头像 -->
                <img
                    class="w-3 h-3 rounded-sm"
                    src="https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/%E7%81%B0%E5%A4%AA%E7%8B%BC.png"
                    alt=""
                />
                <!-- 下箭头 -->
                <g-svgIcon
                    class="h-1.5 w-1.5 ml-0.5"
                    name="down-arrow"
                    fillClass="fill-zinc-900"
                ></g-svgIcon>
                <!-- vip图标 -->
                <g-svgIcon
                    class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
                    name="vip"
                    fillClass="fill-zinc-900"
                ></g-svgIcon>
            </div>
        </template>
        <!-- 匿名插槽 -->
        <div class="w-[140px] overflow-hidden">
            <div
                v-for="item in userArr"
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
import { ref } from 'vue'

const userArr = [
    {
        id: 1,
        icon: 'user-home',
        name: '个人中心',
        path: '/userInfo'
    },
    {
        id: 2,
        icon: 'user-VIP',
        name: '升级 VIP',
        path: '/userVIP'
    },
    {
        id: 3,
        icon: 'user-logout',
        name: '退出登录',
        path: ''
    }
]
</script>

<style lang="scss" scoped></style>
