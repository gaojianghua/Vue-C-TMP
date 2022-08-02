
interface IList {
    page: number,
    size: number
}

export interface IPexelsApi {
    getData: (query: IList) => Promise<any>
}