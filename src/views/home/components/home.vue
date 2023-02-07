<template>
  <div id="homes" class="home">
     <!-- ref="home" :style="{ height: data.storeHeight }" -->
    <div class="topInfo">
      <div class="coin-level">
        <div class="level-icon">5</div>
        <div class="level-progress"><van-progress :percentage="50" stroke-width="15" color="#4EC5E4" track-color="#ADECEB"/></div>
      </div>
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
      <div id="chartView-effict" class="chartView-effict"></div>
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
          <div class="top-silkbag">
            <div class="silkbag-one">
              <div>
                <img style="width: 2rem;height: 2rem;" :src="require('@/assets/home/silkbag.png')" :srcset="require('@/assets/home/silkbag@2x.png')+' 2x,'+require('@/assets/home/silkbag@3x.png')+' 3x'"/>
              </div>
            </div>
            <div class="silkbag-two">
              <div>
                <img style="width: 2rem;height: 2rem;" :src="require('@/assets/home/silkbag.png')" :srcset="require('@/assets/home/silkbag@2x.png')+' 2x,'+require('@/assets/home/silkbag@3x.png')+' 3x'"/>
              </div>
            </div>
          </div>
          <div class="tabbutton-gift" @click="openSilk">
            <div class="sign-icon"></div>
            <div>开启锦囊</div>
          </div>
          <div class="bottom-silkbag">
            <div class="silkbag-three">
              <div>
                <img style="width: 2rem;height: 2rem;" :src="require('@/assets/home/silkbag.png')" :srcset="require('@/assets/home/silkbag@2x.png')+' 2x,'+require('@/assets/home/silkbag@3x.png')+' 3x'"/>
              </div>
            </div>
            <div class="silkbag-four">
              <div>
                <img style="width: 2rem;height: 2rem;" :src="require('@/assets/home/silkbag.png')" :srcset="require('@/assets/home/silkbag@2x.png')+' 2x,'+require('@/assets/home/silkbag@3x.png')+' 3x'"/>
              </div>
            </div>
          </div>
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
import router from "@/pages/index";
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
  chart_effict: null,
  showSign:false,
  showBag:false,
  intoData:[],
  bagInfo:[],
});
onMounted(() => {
  // data.storeHeight = $instanceToBottom(home._value);
  data.mainFuncHeight = $instanceToBottom(mainFunc._value);
  console.log("xxx", data.storeHeight);
  getUserInfo();
  initChart_effict();
});

//离开该页面时取消渲染
onBeforeUnmount(() => {
  if (
    data.chart_effict != null &&
    data.chart_effict != "" &&
    data.chart_effict != undefined
  ) {
    data.chart_effict.dispose();
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
      router.push({
        path: "/rankList",
      });
      break;
    //分享
    case 3:
      Toast("敬请期待！")
      break;
  }
};

function openRank(){
  router.push({
    path: "/rankList",
  });
}

//剩余体力值
function initChart_effict() {
  data.chart_effict = echarts.init(document.getElementById("chartView-effict"));
  data.chart_effict.setOption({
    series: [
      {
        type: "gauge",    //类型：仪表盘
        startAngle: 90,  //环形起点度数
        endAngle: 450,    //环形终点度数
        min: 0,
        max: 100,
        splitNumber:{
          show:false  //不展示数字
        },
        radius: "100%",   //环形大小
        center: ["50%", "50%"], //环形位置
        itemStyle: {
          color: "#fff",  //进度颜色
          shadowColor: "#fff",  //进度条阴影颜色
          shadowBlur: 3, //进度条阴影范围
          shadowOffsetX: 1,//进度条阴影横向偏差
          // shadowOffsetY: 2,//进度条阴影纵向偏差
        },
        progress: {
          show: true,
          roundCap: true,
          width: 10,  //进度条肥瘦
        },
        pointer: {
          show:false  //不展示指针
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            color:[[1,'#ADECEB']],  //仪表盘环形背景颜色
            width: 10, //背景肥瘦
          },
        },
        axisTick: {
          show:false, //不展示刻度环
        },
        splitLine: {
          show:false, //不展示刻度
        },
        title: {
          show: false,
        },
        //底部文字百分比样式
        detail: {
          lineHeight: 30,
          height: 45,
          borderRadius: 8,
          offsetCenter: [0, "-10%"],
          valueAnimation: true,
          formatter: function (value) {
            return "{value|" + value.toFixed(0) + "}{unit|%}\n"+"{intro|体力值}";
          },
          rich: {
            value: {
              fontSize: 20,
              color: "#fff",
            },
            unit: {
              fontSize: 20,
              color: "#fff",
              padding: [0, 0, 0, 10],
            },
            intro:{
              fontSize: 14,
              color: "#fff",
            }
          },
        },
        data: [
          {
            value: 75,
            name:"体力值",
          },
        ],
      },
    ],
  });
}
</script>

<style lang="scss">
@import "@/views/home/components/home.scss";
</style>
