import http from '@/utils/request'
import * as T from './types'

const categoryApi: T.ICategoryApi = {
    getData() {
        return http.get('/category')
    },
}
export default categoryApi