<template>
  <div id="homes" class="home" ref="home" :style="{ height: data.storeHeight }">
    <div class="topInfo">
      <div class="coin-none"></div>
      <div class="coin-money">
        <div class="coin-money-left"></div>
        <div class="coin-middle">60</div>
        <div class="coin-money-right"></div>
      </div>
      <div class="coin-activity">
        <div class="coin-activity-left"></div>
        <div class="coin-middle">60</div>
        <div class="coin-activity-right"></div>
      </div>
    </div>
    <div class="banner">
      <div class="banner-left">
        <div class="banner-title1">我们负责坚持</div>
        <div class="banner-title2">剩下的交给时间</div>
      </div>
      <div id="chartView-userInfo" class="chartView-userInfo"></div>
    </div>
    <div class="tabbuton">
      <div class="tabbutton-sign" @click="tabButton(0)">
        <div class="sign-icon"></div>
        <div>签到</div>
      </div>
      <div class="tabbutton-bag" @click="tabButton(1)">
        <div class="bag-icon"></div>
        <div>背包</div>
      </div>
      <div class="tabbutton-order" @click="tabButton(2)">
        <div class="order-icon"></div>
        <div>排行</div>
      </div>
      <div class="tabbutton-share" @click="tabButton(3)">
        <div class="share-icon"></div>
        <div>分享</div>
      </div>
    </div>
    <div class="main-func" ref="mainFunc" :style="{ height: data.mainFuncHeight }">
      <div class="learn-room">
        <div class="learn-room-font">自习室</div>
      </div>
      <div class="other-func">
        <div class="other-left">
          <div class="other-left-font">敬请期待</div>
        </div>
        <div class="other-right">
          <div class="other-right-font">活动中心</div>
        </div>
      </div>
    </div>
    
    <!-- 签到界面 -->
    <daily-sign :visible="data.showSign" @resetTab="resetTab" :intoData="data.intoData"></daily-sign>
    <!-- 背包界面 -->
    <user-bag :visible="data.showBag" :bagInfo="data.bagInfo" @closeBag="closeBag"></user-bag>
  </div>
</template>

<script setup>
import dailySign from "./dailySign"
import userBag from "./userBag"
import { getCurrentInstance, reactive, onMounted, ref, onBeforeUnmount } from "vue";
import { Dialog, Toast } from "vant";
import { numFilter } from "@/filter/filter.js";
import { selectUserInfo } from "@/api/about";
import { userSign,openUserBag } from "@/api/home";
import * as echarts from "echarts";
const home = ref();
const mainFunc = ref();
const _this = getCurrentInstance();
const { $instanceToBottom } = _this.appContext.config.globalProperties;

const data = reactive({
  storeHeight: $instanceToBottom(home._value),
  mainFuncHeight: $instanceToBottom(mainFunc._value),
  chart_userInfo: null,
  showSign:false,
  showBag:false,
  intoData:[],
  bagInfo:[],
});
onMounted(() => {
  data.storeHeight = $instanceToBottom(home._value);
  data.mainFuncHeight = $instanceToBottom(mainFunc._value);
  console.log("xxx", data.storeHeight);
  getUserInfo();
  initChart_userInfo();
});

//离开该页面时取消渲染
onBeforeUnmount(() => {
  if (
    data.chart_userInfo != null &&
    data.chart_userInfo != "" &&
    data.chart_userInfo != undefined
  ) {
    data.chart_userInfo.dispose();
  }
});

//登录成功查询用户信息
async function getUserInfo() {
  await selectUserInfo({ username: localStorage.getItem("username") }).then(
    (res) => {
      if (res.code === 0) {
        let token = JSON.stringify(res.content);
        localStorage.setItem("token", token);
      }
    }
  );
}

//关闭签到页面
function resetTab(){
  data.showSign = false
}

//关闭背包页面
function closeBag(){
  data.showBag = false
}

function tabButton(i){
  let token = JSON.parse(localStorage.getItem("token")) 
  switch(i){
    //签到
    case 0:
      userSign({ userId:token.userId }).then((res) => {
        if(res.code===0){
          data.intoData = res.content.list
          data.showSign = true
        }else{
          Toast("今日已经签过到了~")
        }
      })
      break;
    //背包
    case 1:
    // data.showBag = true
      openUserBag({ userId:token.userId,typeId:10000 }).then((res) => {
        if(res.code===0){
          data.bagInfo = JSON.parse(JSON.stringify(res.content.list)) 
          data.showBag = true
        }else{
          Toast("背包打开失败，请重试~")
        }
      })
      
      break;
    //排行
    case 2:
    data.showSign = true
      // Toast("敬请期待！")
      break;
    //分享
    case 3:
      Toast("敬请期待！")
      break;
  }
};

//个人雷达图
function initChart_userInfo() {
  const dataBJ = [
  [250, 200, 250, 4, 180, 1],
];
  data.chart_userInfo = echarts.init(
    document.getElementById("chartView-userInfo")
  );
  const lineStyle = {
    width: 0.3,
    opacity: 0.6
  };
  data.chart_userInfo.setOption({
    // backgroundColor: '#83E0DD',
  textStyle:{
    fontSize:12,
    opacity:0.8,
  },
  radar: {
    indicator: [
      { name: '学习时长', max: 300 },
      { name: '专注', max: 250 },
      { name: '成长', max: 300 },
      { name: '毅力', max: 5 },
      { name: '成就', max: 200 },
    ],
    shape: 'circle',
    splitNumber: 5,
    axisName: {
      color:'#fff'
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(252, 252, 252, 0.1)',
          'rgba(252, 252, 252, 0.2)',
          'rgba(252, 252, 252, 0.4)',
          'rgba(252, 252, 252, 0.6)',
          'rgba(252, 252, 252, 0.8)',
          'rgba(252, 252, 252, 1)'
        ].reverse()
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(252, 252, 252, 0.5)'
      }
    },
    nameGap:6,
  },
  series: [
    {
      name: 'Beijing',
      type: 'radar',
      lineStyle: lineStyle,
      data: dataBJ,
      symbol: 'none',
      itemStyle: {
        color: '#fff'
      },
      areaStyle: {
        opacity: 0.6
      }
    },
  ]
  });
}
</script>

<style lang="scss">
@import "@/views/home/components/home.scss";
</style>
