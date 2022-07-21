<template>
    <mobile-navigation-vue v-if="isMobileTerminal" :data="category" />
</template>

<script setup lang="ts">
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'
import { ref } from 'vue'
import { categoryApi } from '@/api/index'
import { ALL_CATEGORY_ITEM } from '@/constants'

const category = ref([
    {
        name: 'ajhjshjh'
    },
    {
        name: 'ajhjshjh'
    },{
        name: 'ajhjshjh'
    },
    {
        name: 'ajhjshjh'
    },
    {
        name: 'ajhjshjh'
    },
    {
        name: 'ajhjshjh'
    },
    {
        name: 'ajhjshjh'
    }
])
category.value.unshift(ALL_CATEGORY_ITEM)
// const getCategoryData = async () => {
//     const { data, code } = await categoryApi.getData()
//     if (code === 200) {
//         category.value = data
//     }
// }
// getCategoryData()
</script>

<style lang="scss" scoped></style>
