import http from '@/utils/request'
import * as T from './types'

const pexelsApi: T.IPexelsApi = {
    // 获取图片数据列表
    getData(query) {
        return http.get('/pexels/list', query)
    },
    // 获取搜索提示
    getHint(query) {
        return http.get('/pexels/hint', query)
    },
    // 获取推荐主题
    getThemes() {
        return http.get('/pexels/themes')
    },
    // 获取指定图片数据
    getPexelsFromId(query) {
        return http.get(`/pexels`, query)
    }
}
export default pexelsApi
