<template>
    <div class="w-full">
        <g-search v-model="inputValue">
            <template #dropdown>
                <div>
                    
                </div>
            </template>
        </g-search>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
</script>

<style lang="scss" scoped></style>
