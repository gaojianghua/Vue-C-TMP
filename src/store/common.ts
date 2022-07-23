/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-23 20:38:10
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-23 22:15:43
 * @FilePath     : \web-C-tmp\src\store\common.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM, CATEGORY_INIT_DATA } from '@/constants'
import { categoryApi } from '@/api/index'

interface SCategorys {
    id: string
    name: string
}

const useCommonStore = defineStore('common', {
    state: () => {
        return {
            categorys: <SCategorys[]>CATEGORY_INIT_DATA
        }
    },
    actions: {
        async getCategorys() {
            const { data, code } = await categoryApi.getData()
            if (code === 200) {
                this.categorys = [ALL_CATEGORY_ITEM, ...data]
            }
        }
    },
    persist: {
        key: 'common',
        storage: window.localStorage,
        paths: ['categorys'],
        beforeRestore: (context) => {
            console.log('Before hydration...:' + context)
        },
        afterRestore: (context) => {
            console.log('After hydration...:' + context)
        }
    }
})

export default useCommonStore
