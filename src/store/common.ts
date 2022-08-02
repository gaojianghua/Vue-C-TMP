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
import { ALL_CATEGORY_ITEM, CATEGORY_INIT_DATA, THEME_LIGHT } from '@/constants'
import { categoryApi } from '@/api/index'

interface SCategorys {
    id: string
    name: string
}

const useCommonStore = defineStore('common', {
    state: () => {
        return {
            categorys: <SCategorys[]>CATEGORY_INIT_DATA,
            theme: <String>THEME_LIGHT,
            currentCategory: ALL_CATEGORY_ITEM,
        }
    },
    actions: {
        async getCategorys() {
            const { data, code } = await categoryApi.getData()
            if (code === 200) {
                this.categorys = [ALL_CATEGORY_ITEM, ...data]
            }
        },
        setTheme(data: string) {
            this.theme = data
        },
        changeCurrentCategory(newCategory: any) {
            this.currentCategory = newCategory
        },
        currentCategoryIndex() {
            return this.categorys.findIndex(item => {
                return item.id === this.currentCategory.id
            })
        },
    },
    persist: {
        key: 'common',
        storage: window.localStorage,
        paths: ['categorys', 'theme'],
        beforeRestore: (context) => {
            console.log('Before hydration...:' + context)
        },
        afterRestore: (context) => {
            console.log('After hydration...:' + context)
        },
    },
})

export default useCommonStore
