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
                注册账号
            </h3>
            <!-- 表单 -->
            <vee-form @submit="onRegisterHandler">
                <!-- 用户名 -->
                <vee-field
                    v-model="registerForm.username"
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
                    v-model="registerForm.password"
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
                <!-- 确认密码 -->
                <vee-field
                    v-model="registerForm.confirmPassword"
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
                    name="confirmPassword"
                    placeholder="确认密码"
                    autocomplete="on"
                    type="password"
                    rules="validateConfirmPassword:@password"
                />
                <vee-error-message
                    class="text-sm text-red-600 block mt-0.5 text-left"
                    name="confirmPassword"
                />
                <!-- 跳转按钮 -->
                <div class="pt-1 pb-3 leading-[0px] text-right">
                    <a
                        @click="onToLogin"
                        class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
                        >去登录</a
                    >
                </div>
                <!-- 注册协议 -->
                <div class="text-center">
                    <a
                        class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300"
                        href="https://gaojianghua.cn/agreement"
                        target="_blank"
                    >
                        注册即同意 《wolffy协议》
                    </a>
                </div>
                <!-- 注册按钮 -->
                <g-button
                    :loading="loading"
                    :isActiveAnim="false"
                    class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
                >
                    立即注册</g-button
                >
            </vee-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import {
    Form as VeeForm,
    Field as VeeField,
    ErrorMessage as VeeErrorMessage,
    defineRule
} from 'vee-validate'
import { validateUsername, validatePassword, validateConfirmPassword } from '../validate'
import useStore from '@/store'
import { IRegister } from '@/types'
import router from '@/router'
import { LOGIN_TYPE_USERNAME } from '@/constants'

const { user } = useStore()

// 插入规则
defineRule('validateConfirmPassword', validateConfirmPassword)
// 用户注册参数
const registerForm = ref<IRegister>({
    username: '',
    password: '',
    confirmPassword: ''
})
// loading
const loading = ref<boolean>(false)

// 点击注册
const onRegisterHandler = async () => {
    loading.value = true
    try {
        // 注册
        const query = {
            username: registerForm.value.username,
            password: registerForm.value.password
        }
        await user.register(query)
        // 注册完成直接触发登录
        await user.login({
            ...query,
            loginType: LOGIN_TYPE_USERNAME
        })
    } finally {
        loading.value = false
    }
    router.push('/')
}
// 去登陆事件
const onToLogin = () => {
    router.push('/login')
}
</script>

<style lang="scss" scoped></style>
