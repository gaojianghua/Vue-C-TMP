
export interface IVipApi {
    getVipPayList: () => Promise<any>
    getAliPay: (query: any) => Promise<any>
}