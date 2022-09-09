import { defineStore } from 'pinia'
import MD5 from 'md5'
import { sysApi, userApi } from '@/api'
import { message } from '@/libs'

const useUserStore = defineStore('user', {
    state: () => {
        return {
            // 用户搜索历史记录
            historys: <string[]>[],
            // 登录的 token
            token: <string>'',
            // 用户信息
            userInfo: <any>{}
        }
    },
    actions: {
        // 新增历史记录
        addHistory(newHistory: string) {
            const isFindIndex = this.historys.findIndex((item) => item === newHistory)
            // 移除旧数据
            if (isFindIndex !== -1) {
                this.historys.splice(isFindIndex, 1)
            }
            // 新增记录
            this.historys.unshift(newHistory)
        },
        // 删除单个历史记录
        deleteHistory(index: number) {
            this.historys.splice(index, 1)
        },
        // 清空历史记录
        deleteAllHistory() {
            this.historys = []
        },
        // 保存 token
        setToken(newToken: string) {
            this.token = newToken
        },
        // 注册
        async register(query: any) {
            // 加密密码
            // const { password } = query
            // return await sysApi.register({
            //     ...query,
            //     password: password ? MD5(password) : ''
            // })
        },
        // 登录
        async login(query: any) {
            // 加密密码
            // const { password } = query
            // const { data, code } = await sysApi.login({
            //     ...query,
            //     password: password ? MD5(password) : ''
            // })
            // if (code === 200) {
            //     // 保存token
            //     this.setToken(data.token)
            //     // 获取用户信息
            //     this.getProfile()
            // }
            this.setToken('123')
            this.getProfile()
        },
        // 保存 用户信息
        setUserInfo(newUserInfo: any) {
            this.userInfo = newUserInfo
        },
        // 获取用户信息
        async getProfile() {
            // const { data, code } = await userApi.getProfile()
            // if (code === 200) {
            //     this.setUserInfo(data)
            //     message('success', `欢迎您 ${data.vipLevel ? '尊贵的 VIP' + data.vipLevel + '用户 ' + data.nickname : data.nickname}`, 5000)
            // }
            let data = {
                title: '前端开发工程师',
                nickname: '高江华',
                vipLevel: 5,
                company: '',
                introduction: '我自横刀向天笑, 去留肝胆两昆仑',
                homePage: 'https://gaojianghua.cn/doce',
                avatar: 'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/%E7%81%B0%E5%A4%AA%E7%8B%BC.png'
            }
            this.setUserInfo(data)
            message(
                'success',
                `欢迎您 ${
                    data.vipLevel
                        ? '尊贵的 VIP' + data.vipLevel + '用户 ' + data.nickname
                        : data.nickname
                }`,
                5000
            )
        },
        // 退出登录
        logout() {
            this.setToken('')
            this.setUserInfo({})
            location.reload()
        }
    },
    persist: {
        key: 'user',
        storage: window.localStorage,
        paths: ['token', 'userInfo'],
        beforeRestore: (context) => {
            console.log('Before hydration...:' + context)
        },
        afterRestore: (context) => {
            console.log('After hydration...:' + context)
        }
    }
})

export default useUserStore
