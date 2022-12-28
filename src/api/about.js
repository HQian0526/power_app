import { post } from "./axios/http";

//获取用户信息(头像、昵称、简介、等级、性别)
export function selectUserInfo(params){
    return post("/powertool/aboutus/selectUserInfo",params)
}