export interface IUserApi {
    getProfile: () => Promise<any>
    getSts: () => Promise<any>
    putProfile: (query: any) => Promise<any>
}
