interface IList {
    page: number
    size: number
}
interface IHint {
    p: string
}

export interface IPexelsApi {
    getData: (query: IList) => Promise<any>
    getHint: (query: IHint) => Promise<any>
    getThemes: () => Promise<any>
    getPexelsFromId: (query:any) => Promise<any>
}
