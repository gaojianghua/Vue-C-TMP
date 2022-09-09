<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-14 20:53:46
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-16 02:59:33
 * @FilePath     : \web-C-tmp\src\views\login-register\login\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
        <!-- 头部图片 -->
        <header-vue></header-vue>
        <!-- 表单区域 -->
        <div
            class="px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
        >
            <h3 class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block">
                账号登录
            </h3>
            <!-- 表单 -->
            <vee-form @submit="onLoginHandler">
                <!-- 用户名 -->
                <vee-field
                    v-model="loginForm.username"
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
                    name="username"
                    placeholder="用户名"
                    autocomplete="on"
                    type="text"
                    :rules="validateUsername"
                />
                <vee-error-message
                    class="text-sm text-red-600 block mt-0.5 text-left"
                    name="username"
                />
                <!-- 密码 -->
                <vee-field
                    v-model="loginForm.password"
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
                    name="password"
                    placeholder="密码"
                    autocomplete="on"
                    type="password"
                    :rules="validatePassword"
                />
                <vee-error-message
                    class="text-sm text-red-600 block mt-0.5 text-left"
                    name="password"
                />
                <!-- 跳转按钮 -->
                <div class="pt-1 pb-3 leading-[0px] text-right">
                    <a
                        @click="onToRegister"
                        class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
                        >去注册</a
                    >
                </div>
                <!-- 登录按钮 -->
                <g-button
                    :loading="loading"
                    :isActiveAnim="false"
                    class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
                >
                    登录</g-button
                >
            </vee-form>
            <!-- 第三方登录 -->
            <div class="flex justify-around mt-4">
                <!-- QQ -->
                <qq-login-vue></qq-login-vue>
                <!-- 微信 -->
                <g-svg-icon class="w-4 cursor-pointer" name="weixin"></g-svg-icon>
            </div>
        </div>
        <slider-captcha-vue
            v-if="isSliderCaptchaVisible"
            @close="isSliderCaptchaVisible = false"
            @success="onCaptchaSuccess"
        ></slider-captcha-vue>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import SliderCaptchaVue from './slider-captcha.vue'
import qqLoginVue from './qq-login.vue'
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import { ILogin } from '@/types'
import { LOGIN_TYPE_USERNAME, LOGIN_TYPE_QQ, LOGIN_TYPE_WEIXIN } from '@/constants'
import useStore from '@/store'
import router from '@/router'

const { user } = useStore()
// 控制sliderCaptcha的展示
const isSliderCaptchaVisible = ref<boolean>(false)

// 点击登录
const onLoginHandler = () => {
    isSliderCaptchaVisible.value = true
}
// 人类行为验证通过
const onCaptchaSuccess = () => {
    isSliderCaptchaVisible.value = false
    onLogin()
}
// 用户登录参数
const loginForm = ref<ILogin>({
    username: '',
    password: '',
    loginType: LOGIN_TYPE_USERNAME
})
// loading
const loading = ref<boolean>(false)
// 用户登录行为
const onLogin = async () => {
    loading.value = true
    // 执行登录操作
    try {
        await user.login(loginForm)
    } finally {
        loading.value = false
    }
    router.push('/')
}
// 去注册事件
const onToRegister = () => {
    router.push('/register')
}
</script>

<style lang="scss" scoped></style>
