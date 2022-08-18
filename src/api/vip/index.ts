import http from '@/utils/request'
import * as T from './types'

const vipApi: T.IVipApi = {
    // 获取VIP种类数据
    getVipPayList() {
        return http.get('/user/vip/pay/list')
    },
    getAliPay(query) {
        return http.get('/user/alipay', query)
    }
}
export default vipApi