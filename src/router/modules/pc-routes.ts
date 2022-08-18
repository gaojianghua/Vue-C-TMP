/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-19 11:05:52
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-23 21:34:55
 * @FilePath     : \web-C-tmp\src\router\modules\pc-routes.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */
export default [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/views/profile/index.vue'),
                // 标记当前页面只能用户登录后才能进入
                meta: {
                    user:true
                }
            },
            {
                path: '/member',
                name: 'member',
                component: () => import('@/views/member/index.vue'),
                // 标记当前页面只能用户登录后才能进入
                meta: {
                    user:true
                }
            },
        ],
    },
    {
        path: '/pins/:id',
        name: 'pins',
        component: () => import('@/views/pins/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login-register/login/index.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login-register/register/index.vue'),
    },
]
