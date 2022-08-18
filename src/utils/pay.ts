import store from '@/store'
import { vipApi } from '@/api'
import { isMobileTerminal } from '@/utils/flexible'

/**
 * 触发支付宝支付
 * @param {*} title 支付标题
 * @param {*} desc 支付描述
 */
export const alipay = async (title: string, desc: string) => {
    // encode 的支付地址
    const { encodeURI } = await vipApi.getAliPay({
        subject: title,
        totalAmount: '0.01',
        body: desc,
        isMobile: isMobileTerminal.value
    }
        
    )
    // 解构
    window.location.href = decodeURIComponent(encodeURI)
}
