// 基础请求模块放在，即便以后axios不维护了，只用修改这层即可
import axios from "axios";
// request实际就是一个promise
export function request(config) {
    // 配置路由前缀
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })
    
    // request拦截器
    instance.interceptors.request.use(config => {
        // console.log(config);
        return config;
    },
    err => {
        console.log(err);
    })

    // response拦截器
    instance.interceptors.response.use(res => {
        // console.log("inter resp: ", res);
        return res.data;
    }, err => {
        console.log(err);
    })
    return instance(config);
}