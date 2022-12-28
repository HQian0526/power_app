<template>
<div class="accountCard">
  <div class="account-view">
    <div class="headimg">
      <van-image cover round width="60px" height="60px" :src="data.defaultHead" />
    </div>
    <div class="nickname">
        <div class="names">{{data.userName}}</div>
        <div class="level">
            <div class="levelfont">Lv.99</div>
        </div>
    </div>
    <div class="icon-arrowright iconfont"></div>
  </div>
  <div class="progress"><van-progress color="#F0F0F0" track-color="#242424" :show-pivot="false" :percentage="data.percentageExp" /></div>
</div>
</template>

<script>
import defaultHead from "@/assets/home/defaultHead.png";
import boyhead from "@/assets/home/boy.jpg";
import girlhead from "@/assets/home/girl.jpg";
import { reactive } from "@vue/reactivity";
import { onActivated, onMounted, watch } from '@vue/runtime-core';
export default {
  name: "accountCard",
  components: {},
  props: {
    sex: {
      type: String,
      default: "1",//1男 2女
    },
    imgsrc: {
      type: String,
      default: "",
    },
    exp:{
      type: Number,
      default: 10,
    },
    upExp:{
      type: Number,
      default: 100,
    },
    isLogin:{
      type: Boolean,
      default: false,
    },
    userName:{
      type: String,
      default: '小白',
    },
  },
  setup(props) {
    const data = reactive({
      defaultHead:defaultHead,
      boys: boyhead,
      girls: girlhead,
      exp:props.exp,
      upExp:props.exp,
      percentageExp:0,
      userName:props.userName
    });
    onMounted(() => {
    })
    watch(props,(newValue,oldValue) => {
      if(props.isLogin === false){
        data.percentageExp = 0
        data.userName = '请登录后查看用户信息'
        return
      }
      console.log("exp",props.exp)
      console.log("upexp",props.upExp)
      data.percentageExp = Math.floor((props.exp/props.upExp)*100)

    })
    return {
      data,
    };
  },
};
</script>

<style>
@import './accountCard.scss'
</style>