import router from "@/pages";
import axios from "axios";
import { Toast } from "vant";
import { reactive } from "vue";
import config from "./config";

const data = reactive({
    toast1:null
})

const instance = axios.create({
    // baseURL:config.baseUrl.dev,  //已在vue.config.js中做了跨域拼接处理，此处不用拼接
    timeout: 60000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
})

//请求拦截
instance.interceptors.request.use(
    function (config) {
        data.toast1 = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:0
        });
        if (config.url !== '/powertool/sys/login') {
            if (localStorage.getItem('username')) {
                return config;
            }
            Toast("用户未登录！")
            router.push("/login")
            return Promise.reject();
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

//响应拦截
instance.interceptors.response.use(
    (response) => {
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (response.status === 200) {
        data.toast1.clear()
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    // 服务器状态码不是2开头的的情况
    (error) => {
      if (error.response.status) {
        switch (error.response.status) {
          // 401: 未登录
          case 401:
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
            break;
          case 403:
            Toast("管理员权限已修改请重新登录");
            // 清除sessionStorage
            // store.commit("qiut");
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            setTimeout(() => {
              router.replace({
                path: "/login",
                query: {
                  redirect: router.currentRoute.fullPath,
                },
              });
            }, 1000);
            break;
          // 404请求不存在
          case 404:
            Toast("请求页面飞到火星去了");
            break;
          //500服务器冒烟了~
          case 500:
            Toast("服务器冒烟了，正在救火~");
            break;
        }
        return Promise.reject(error.response);
      }
    }
  );

//get
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, { params: params }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err)
        })
    })
}

//post
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            reject(err)
        })
    })
}