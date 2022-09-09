//http.ts
import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'
import useStore from '@/store'

// 设置请求头和请求路径
const server = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 10000,
    headers: {
        icode: '8956',
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
// 请求拦截
server.interceptors.request.use(
    (config): AxiosRequestConfig<any> => {
        const { token } = useStore().user
        if (token) {
            //@ts-ignore
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return error
    }
)
// 响应拦截
server.interceptors.response.use(
    (res) => {
        const { code, msg, data } = res.data
        if (code === 200) {
            return data
        }
        return Promise.reject(new Error(msg))
    },
    (error) => {
        // token过期处理
        if (error.response?.data?.code === 401) {
            useStore().user.logout()
        }
        return Promise.reject(error)
    }
)
// 请求封装
interface ResType<T> {
    code: number
    data?: T
    msg: string
    err?: string
}
interface Http {
    get<T>(url: string, params?: unknown): Promise<ResType<T>>
    post<T>(url: string, params?: unknown): Promise<ResType<T>>
    put<T>(url: string, params?: unknown): Promise<ResType<T>>
    remove<T>(url: string, params?: unknown): Promise<ResType<T>>
    upload<T>(url: string, params: unknown): Promise<ResType<T>>
    download(url: string): void
}
const http: Http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            server
                .get(url, { params })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            server
                .post(url, JSON.stringify(params))
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    put(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            server
                .put(url, JSON.stringify(params))
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    remove(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            server
                .delete(url, { params })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    upload(url, file) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            server
                .post(url, file, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    download(url) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
            document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    }
}
export default http
