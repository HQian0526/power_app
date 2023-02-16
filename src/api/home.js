import { post } from "./axios/http";

//用户签到
export function userSign(params){
    return post("/powertool/home/userSign",params)
}

//打开背包
export function openUserBag(params){
    return post("/powertool/home/userBag",params)
}

//查询用户等级
export function userLevel(params){
    return post("/powertool/home/userLevel",params)
}