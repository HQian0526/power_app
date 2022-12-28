import { post } from "./axios/http";

//用户登录
export function userLogin(params){
    return post("/powertool/sys/login",params)
}