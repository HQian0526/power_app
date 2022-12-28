<template>
  <div class="login">
    <div class="back-ground"></div>
    <div class="green-long"></div>
    <div class="login-form">
      <div class="login-input">
        <van-form @submit="onSubmitTrue">
          <van-cell-group inset>
            <van-field
              v-model="data.username"
              name="用户名"
              placeholder="请输入您的手机号"
            >
              <template #left-icon>
                <div class="iconfont icon-acount"></div>
              </template>
            </van-field> 
            <van-field
              v-model="data.password"
              type="password"
              name="密码"
              placeholder="请输入短信验证码"
            >
              <template #left-icon>
                <div class="iconfont icon-password"></div>
              </template>
              <template #button>
                <van-button size="small" plain color="#43DCBE">获取</van-button>
              </template>
            </van-field>
          </van-cell-group>
          <div class="login-tip">*未注册过的手机号将自动创建新账号</div>
          <div class="login-button">
            <van-button block color="#43DCBE" native-type="submit">
              登录
            </van-button>
          </div> 
          <div class="login-agreement">
            <van-checkbox v-model="data.checked" checked-color="#43DCBE" icon-size="0.4rem"></van-checkbox>
            <div class="agreement">
              <div>本人已阅读并遵守</div>
              <div class="agreement-content" @click="toAssistment">《星萤用户隐私协议》</div>
          </div>
          </div>
        </van-form>
      </div>
    </div>
    <van-dialog v-model:show="data.show" show-cancel-button confirm-button-text="同意" @confirm="checkAssistment" @cancel="cancelAssistment" cancel-button-color="#01AA8E" confirm-button-color="#fff">
      <template #title>
        <div class="content-title">用户服务协议</div>
      </template>
      <Assistment></Assistment>
    </van-dialog>
    
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
import { userLogin } from "@/api/system";
import router from "@/pages/index";
import { Toast } from "vant";
import Assistment from "./assistment"
const { proxy } = getCurrentInstance();
const data = reactive({
  username: "",
  password: "",
  checked:false,
  show:false
});

//打开隐私协议
function toAssistment(){
  data.show = true;
}

//阅读后同意协议
function checkAssistment(){
  data.checked = true;
}

//阅读后不同意协议
function cancelAssistment(){
  data.checked = false;
}

//登录校验
function checkInputNumber(){
  if(!data.checked){
    Toast("请先阅读并同意遵守用户隐私协议！")
    return false
  }
  if(!data.username){
    Toast("请输入手机号！")
    return false
  }
  if(!data.password){
    Toast("请输入验证码！")
    return false
  }
  return true
}

//登录功能
function onSubmitTrue() {
  const test = /^\+?[1-9]\d*$/
  const test2 = /^(\d+([.]\d*)?(\d+)?)$/
  let resCheck = checkInputNumber()
  if(!resCheck) return
  let passw = proxy.$md5(data.password);
  userLogin({
    username: data.username,
    password: passw,
  }).then((res) => {
    console.log("res", res);
    if (res.code === 0) {
      localStorage.setItem("username", data.username);
      router.push({
        path: "/home",
      });
    }else{
      data.password = ""
      Toast("验证码有误，请重新输入！")
    }
  });
}
function onSubmitFalse() {
  let resCheck = checkInputNumber()
  if(!resCheck) return
  localStorage.setItem("username", data.username);
      router.push({
        path: "/home",
      });
}
</script>

<style lang="scss">
@import "@/views/login/components/login.scss";
</style>
