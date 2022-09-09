export interface ISysApi {
    getCaptchaData: (query: any) => Promise<any>
    login: (query: any) => Promise<any>
    register: (query: any) => Promise<any>
}
