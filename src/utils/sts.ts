import OSS from 'ali-oss'
import { userApi } from '@/api'
import { REGION, BUCKET } from '@/constants'

export const getOSSClient = async () => {
    const { Credentials } = await userApi.getSts()
    return new OSS({
        // bucket 所在区域
        region: REGION,
        bucket: BUCKET,
        accessKeyId: Credentials.AccessKeyId,
        accessKeySecret: Credentials.AccessKeySecret,
        stsToken: Credentials.SecurityToken,
        // 刷新token
        refreshSTSToken: async () => {
            const { Credentials } = await userApi.getSts()
            return {
                accessKeyId: Credentials.AccessKeyId,
                accessKeySecret: Credentials.AccessKeySecret,
                stsToken: Credentials.SecurityToken
            }
        },
        refreshSTSTokenInterval: 5 * 1000
    })
}
