<template>
    <div
        class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1 scrollbar-none"
    >
        <div
            class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2"
        >
            <!-- 移动端的 navbar -->
            <g-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick"
                >个人资料</g-navbar
            >
            <!-- PC 端标题 -->
            <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">个人资料</div>

            <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:text-center">
                <!-- 头像部分 -->
                <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
                    <span
                        class="w-8 inline-block mb-2 font-black text-sm dark:text-zinc-300 xl:block xl:mx-auto"
                        >我的头像</span
                    >
                    <div
                        @click="onAvatarClick"
                        class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
                    >
                        <!-- 头像 -->
                        <img
                            class="rounded-full w-full h-full xl:inline-block"
                            :src="useStore().user.userInfo.avatar"
                            alt=""
                        />
                        <!-- 鼠标移入 -->
                        <div
                            class="absolute top-0 rounded-full w-full h-full bg-black/40 hidden xl:group-hover:block"
                        >
                            <g-svg-icon
                                name="chang-header-image"
                                class="w-2 h-2 m-auto mt-2"
                                color="#fff"
                            ></g-svg-icon>
                            <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">
                                点击更换头像
                            </div>
                        </div>
                        <!-- 隐藏域 -->
                        <input
                            v-show="false"
                            ref="inputFileTarget"
                            type="file"
                            accept=".png, .jpeg, .jpg, .gif"
                            @change="onSelectImgHandler"
                        />
                        <p class="mt-1 w-[300px] text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
                            支持 jpg、png、jpeg、gif 格式大学 5M 以内的图片
                        </p>
                    </div>
                </div>

                <!-- 信息输入 -->
                <!-- 用户名 -->
                <div class="py-1 mt-4 xl:flex xl:items-center xl:my-1">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
                        用户名
                    </span>
                    <g-input class="w-full" max="20" v-model="userInfo.nickname"></g-input>
                </div>
                <!-- 职位 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"> 职位 </span>
                    <g-input class="w-full" v-model="userInfo.title"></g-input>
                </div>
                <!-- 公司 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"> 公司 </span>
                    <g-input class="w-full" v-model="userInfo.company"></g-input>
                </div>
                <!-- 个人主页 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
                        个人主页
                    </span>
                    <g-input class="w-full" v-model="userInfo.homePage"></g-input>
                </div>
                <!-- 个人介绍 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
                        个人介绍
                    </span>
                    <g-input
                        class="w-full"
                        type="textarea"
                        max="50"
                        v-model="userInfo.introduction"
                    >
                    </g-input>
                </div>
                <!-- 保存修改 -->
                <g-button
                    :loading="loading"
                    @click="onChangeProfile"
                    class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
                >
                    保存修改</g-button
                >
                <!-- 移动端: 退出登录 -->
                <g-button
                    v-if="isMobileTerminal"
                    @click="onLogoutClick"
                    class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
                >
                    退出登录</g-button
                >
            </div>
        </div>
        <!-- PC 端 -->
        <g-dialog v-if="!isMobileTerminal" title="裁剪头像" v-model="isDialogVisible">
            <changeAvatarVue :blob="currentBlob" @close="isDialogVisible = false"></changeAvatarVue>
        </g-dialog>
        <!-- 移动端 -->
        <g-popup v-else :class="{ 'h-screen': isDialogVisible }" v-model="isDialogVisible">
            <changeAvatarVue :blob="currentBlob" @close="isDialogVisible = false"></changeAvatarVue>
        </g-popup>
    </div>
</template>

<script setup lang="ts">
import { InputHTMLAttributes, ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import useStore from '@/store'
import { confirm, message } from '@/libs'
import router from '@/router'
import { userApi } from '@/api'
import changeAvatarVue from './components/change-avatar.vue'

// 移动端下 navbar 左侧点击事件
const onNavbarLeftClick = () => {
    useStore().common.changeRouterType('back')
    router.back()
}
// 移动端: 退出登录
const onLogoutClick = () => {
    confirm('确定要退出登录吗?').then(() => {
        useStore().user.logout()
    })
}
// 控制 dialog 的展示
const isDialogVisible = ref<boolean>(false)
// 选中的图片
const currentBlob = ref<string>('')
// 选择头像
const inputFileTarget = ref<HTMLInputElement>()
const onAvatarClick = () => {
    inputFileTarget.value!.click()
}
// 选中文件之后的回调
const onSelectImgHandler = () => {
    // 获取选中的文件
    const imgFile = inputFileTarget.value!.files![0]
    // 生成 blob 对象
    const blob = URL.createObjectURL(imgFile)
    currentBlob.value = blob
    isDialogVisible.value = true
}
// 本地用户信息
const userInfo = ref(useStore().user.userInfo)
// loading
const loading = ref<boolean>(false)
// 保存修改
const onChangeProfile = async () => {
    loading.value = true
    await userApi.putProfile(userInfo)
    message('success', '用户信息修改成功')
    // 同步store
    useStore().user.setUserInfo(userInfo)
    loading.value = false
}
/**
 * 当两次选择文件, 是同一个的时候, change 的回调不会被再次触发
 * 需要在每次选择的图片不在被使用之后, 清空掉 inputTarget 的value
 */
watch(isDialogVisible, (val) => {
    if (!val) {
        inputFileTarget.value!.value = ''
    }
})
</script>

<style lang="scss" scoped></style>
