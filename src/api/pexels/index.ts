import http from '@/utils/request'
import * as T from './types'

const pexelsApi: T.IPexelsApi = {
    getData(query) {
        return http.get('/pexels', query)
    },
}
export default pexelsApi