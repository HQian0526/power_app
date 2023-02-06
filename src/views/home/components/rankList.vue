<template>
  <div class="rank" ref="rank" :style="{ height: data.storeHeight }">
    <div class="title">
      <div class="title-back iconfont icon-back" @click="goBack"></div>
      <div class="title-font">排行榜</div>
      <div class="title-null"></div>
    </div>
    <div class="tabs">
      <div :class="data.tabIndex===0?'tabs-country-choose':'tabs-country-none'" @click="changeTab(0)">全国排名</div>
      <div :class="data.tabIndex===1?'tabs-friend-choose':'tabs-friend-none'" @click="changeTab(1)">好友排名</div>
    </div>
    <div class="tips">
      <div class="tips-one">当千丝万缕微光产生质变时</div>
      <div class="tips-two">星萤之光亦可与皓月争辉</div>
    </div>
    <div class="best">
      <div class="best-second">
        <div class="best-second-num">2</div>
        <div class="best-second-img">
          <img style="width: 1.2rem;height: 1.2rem;border-radius: 5rem;" :src="require('@/assets/home/boy.png')" :srcset="require('@/assets/home/boy@2x.png')+' 2x,'+require('@/assets/home/boy@3x.png')+' 3x'"/>
        </div>
        <div class="best-second-name">我是一个小测试</div>
        <div class="best-second-level">Lv.25</div>
      </div>

      <div class="best-first">
        <div class="best-second-num">1</div>
        <div class="best-second-img">
          <img style="width: 1.2rem;height: 1.2rem;border-radius: 5rem;" :src="require('@/assets/home/boy.png')" :srcset="require('@/assets/home/boy@2x.png')+' 2x,'+require('@/assets/home/boy@3x.png')+' 3x'"/>
        </div>
        <div class="best-second-name">我是一个小测试</div>
        <div class="best-second-level">Lv.25</div>
      </div>

      <div class="best-third">
        <div class="best-second-num">3</div>
        <div class="best-second-img">
          <img style="width: 1.2rem;height: 1.2rem;border-radius: 5rem;" :src="require('@/assets/home/boy.png')" :srcset="require('@/assets/home/boy@2x.png')+' 2x,'+require('@/assets/home/boy@3x.png')+' 3x'"/>
        </div>
        <div class="best-second-name">我是一个小测试</div>
        <div class="best-second-level">Lv.25</div>
      </div>
    </div>
    <div class="ranklist">
      <div class="ranklist-detail" v-for="index in 7" :key="key">
        <div class="ranklist-detail-num">{{index+3}}</div>
        <div class="ranklist-detail-imgurl">
          <img style="width: 1rem;height: 1rem;border-radius: 5rem;" :src="require('@/assets/home/boy.png')" :srcset="require('@/assets/home/boy@2x.png')+' 2x,'+require('@/assets/home/boy@3x.png')+' 3x'"/>

        </div>
        <div class="ranklist-detail-nameAndLevel">
          <div class="ranklist-detail-name">测试小黄</div>
          <div class="ranklist-detail-level">Lv.99</div>
        </div>
        <div class="ranklist-detail-time">99小时</div>
      </div>
    </div>
    <div class="myrank">
      <div class="myrank-detail">
        <div class="myrank-detail-num">99+</div>
        <div class="myrank-detail-imgurl">
          <img style="width: 1rem;height: 1rem;border-radius: 5rem;" :src="require('@/assets/home/boy.png')" :srcset="require('@/assets/home/boy@2x.png')+' 2x,'+require('@/assets/home/boy@3x.png')+' 3x'"/>

        </div>
        <div class="myrank-detail-nameAndLevel">
          <div class="myrank-detail-name">测试小黄</div>
          <div class="myrank-detail-level">Lv.99</div>
        </div>
        <div class="myrank-detail-time">99小时</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, onMounted, ref } from "vue";
import router from "@/pages/index";
import { Dialog, Toast } from "vant";
const rank = ref();
const _this = getCurrentInstance();
const { $instanceToBottom } = _this.appContext.config.globalProperties;

const data = reactive({
  storeHeight: $instanceToBottom(rank._value),
  tabIndex:0,
});
onMounted(() => {
  data.storeHeight = $instanceToBottom(rank._value);
});

function goBack(){
  router.go(-1)
}

function changeTab(num){
  data.tabIndex = num
}
</script>

<style lang="scss">
@import "@/views/home/components/rankList.scss";
</style>
