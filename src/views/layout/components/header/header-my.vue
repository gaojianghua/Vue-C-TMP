<template>
    <g-popover class="flex items-center" placement="bottom-left">
        <!-- 具名插槽 -->
        <template #reference>
            <div
                v-if="useStore().user.token"
                class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
                <!-- 用户头像 -->
                <img
                    v-lazy
                    class="w-3 h-3 rounded-sm"
                    :src="useStore().user.userInfo.avatar"
                    alt=""
                />
                <!-- 下箭头 -->
                <g-svg-icon
                    class="h-1.5 w-1.5 ml-0.5"
                    name="down-arrow"
                    fillClass="fill-zinc-900 dark:fill-zinc-200"
                >
                </g-svg-icon>
                <!-- vip图标 -->
                <g-svg-icon
                    v-if="useStore().user.userInfo.vipLevel"
                    class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
                    name="vip"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                ></g-svg-icon>
            </div>
            <div v-else>
                <g-button
                    class="guide-my"
                    icon="profile"
                    iconColor="#fff"
                    @click="onToLogin"
                ></g-button>
            </div>
        </template>
        <!-- 匿名插槽 -->
        <div v-if="useStore().user.token" class="w-[140px] p-1 overflow-hidden">
            <div
                v-for="item in userArr"
                :key="item.id"
                @click="onItemClick(item)"
                class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60"
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
import { ref } from 'vue'
import router from '@/router'
import useStore from '@/store'
import { confirm } from '@/libs'

interface IUserItem {
    id: number
    icon: string
    name: string
    path: string
}

const userArr: IUserItem[] = [
    {
        id: 1,
        icon: 'user-home',
        name: '个人中心',
        path: '/profile'
    },
    {
        id: 2,
        icon: 'user-VIP',
        name: '升级 VIP',
        path: '/member'
    },
    {
        id: 3,
        icon: 'user-logout',
        name: '退出登录',
        path: ''
    }
]
// 登录
const onToLogin = () => {
    router.push('/login')
}
// 点击气泡中的某个元素
const onItemClick = (item: IUserItem) => {
    if (item.id === 3) {
        // 退出登录
        confirm('您确定退出登录吗?').then(() => {
            useStore().user.logout()
        })
        return
    }
    router.push(item.path)
}
</script>

<style lang="scss" scoped></style>
