<template>
    <div class="overflow-auto flex flex-col items-center">
        <g-svg-icon
            v-if="isMobileTerminal"
            name="close"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
            @click="close"
            class="w-3 h-3 p-0.5 m-1 ml-auto"
        ></g-svg-icon>
        <img :src="blob" ref="imageTarget" alt="" />
        <g-button
            :loading="loading"
            :isActiveAnim="false"
            class="mt-4 w-[80%] xl:1/2"
            @click="onConfirmClick"
            >确定
        </g-button>
    </div>
</template>

<script lang="ts">
const EMITS_CLOSE = 'close'
// PC 端配置对象
const PCOptions = {
    // 裁剪框固定纵横比
    aspectRatio: 1
}
// 移动端配置对象
const MBOptions = {
    // 将裁剪框限制在画布的大小
    viewMode: 1,
    // 移动画布, 裁剪框不动
    dragMode: 'move',
    // 裁剪框固定纵横比
    aspectRatio: 1,
    // 裁剪框不可移动
    cropBoxMovable: false,
    // 不可调整裁剪框大小
    cropBoxResizable: false
}
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { getOSSClient } from '@/utils/sts'
import useStore from '@/store'
import { message } from '@/libs'
import { userApi } from '@/api'

const props = defineProps({
    blob: {
        type: String,
        required: true
    }
})
const emits = defineEmits([EMITS_CLOSE])
const loading = ref<boolean>(false)
// 图片裁剪
const imageTarget = ref<HTMLImageElement>()
let cropper: any
onMounted(() => {
    console.log(isMobileTerminal)
    cropper = new Cropper(imageTarget.value!, isMobileTerminal.value ? MBOptions : PCOptions)
})
// 关闭事件
const close = () => {
    emits(EMITS_CLOSE)
}
// 按钮点击事件处理
const onConfirmClick = () => {
    loading.value = true
    // 拿到裁剪后的图片
    cropper.getCroppedCanvas().toBlob((blob: any) => {
        console.log(URL.createObjectURL(blob))
        putObjectToOSS(blob)
    })
}
// 进行 OSS 上传
let ossClient: any
const putObjectToOSS = async (file: File) => {
    if (!ossClient) {
        ossClient = await getOSSClient()
    }
    try {
        const fileTypeArr = file.type.split('/')
        const fileName = `${useStore().user.userInfo.nickname}/${Date.now()}.${
            fileTypeArr[fileTypeArr.length - 1]
        }`
        const res = await ossClient.put(`web-c-tmp/${fileName}`, file)
        onChangeProfile(res.url)
    } catch (error) {
        message('error', String(error))
    }
}
// 上传新头像到服务器
const onChangeProfile = async (avatar: string) => {
    // 更新本地数据
    useStore().user.setUserInfo({
        ...useStore().user.userInfo,
        avatar
    })
    // 更新服务器数据
    await userApi.putProfile(useStore().user.userInfo)
    message('success', '用户头像修改成功')
    loading.value = false
    close()
}
</script>

<style lang="scss" scoped></style>
