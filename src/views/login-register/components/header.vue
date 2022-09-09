<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-14 21:34:38
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-14 21:34:39
 * @FilePath     : \web-C-tmp\src\views\login-register\components\header.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <!-- PC 端: 头部图标 -->
    <div class="hidden pt-5 h-8 xl:block">
        <img
            class="m-auto h-6 w-6"
            src="https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/%E7%81%B0%E5%A4%AA%E7%8B%BC.png"
            alt=""
        />
    </div>
    <!-- 移动端: 头部图标 -->
    <div class="h-[111px] xl:hidden">
        <img class="dark:hidden" src="https://res.lgdsunday.club/login-bg.png" alt="" />
        <img
            class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
            src="https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/%E7%81%B0%E5%A4%AA%E7%8B%BC.png"
            alt=""
        />
    </div>
</template>
