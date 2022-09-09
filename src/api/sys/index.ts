import http from '@/utils/request'
import * as T from './types'

const sysApi: T.ISysApi = {
    // 获取图片数据列表
    getCaptchaData(query) {
        return http.post('/sys/captcha', query)
    },
    // 登录
    login(query) {
        return http.post('/sys/login', query)
    },
    // 注册
    register(query) {
        return http.post('/sys/register', query)
    }
}
export default sysApi
