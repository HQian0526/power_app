import { post } from "./axios/http";

//用户签到
export function userSign(params){
    return post("/powertool/home/userSign",params)
}

//打开背包
export function openUserBag(params){
    return post("/powertool/home/userBag",params)
}