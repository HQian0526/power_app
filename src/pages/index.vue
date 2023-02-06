<template>
  <div id="app">
      <div id="content" :style="{height:data.viewHeight}"><router-view /></div>
      <div class="bottom-nav">
        <router-link class="nav-home" :to="{path:'/home'}" @click="changeView(0)">
          <div :class="data.viewIndex===0?'iconfont icon-home icon-choose':'iconfont icon-home'"></div>
          <div class="nav-name">星萤</div>
        </router-link>
        <router-link class="nav-analyse" :to="{path:'/analyse'}" @click="changeView(1)">
          <div :class="data.viewIndex===1?'iconfont icon-analyse icon-choose':'iconfont icon-analyse'"></div>
          <div class="nav-name">数据分析</div>
        </router-link>
        <router-link class="nav-shop" :to="{path:'/store'}" @click="changeView(2)">
          <div :class="data.viewIndex===2?'iconfont icon-shop icon-choose':'iconfont icon-shop'"></div>
          <div class="nav-name">商店</div>
        </router-link>
        <router-link class="nav-me" :to="{path:'/userInfo'}" @click="changeView(3)">
          <div :class="data.viewIndex===3?'iconfont icon-me icon-choose':'iconfont icon-me'"></div>
          <div class="nav-name">我的</div>
        </router-link>
      </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance} from "vue";
const { proxy } = getCurrentInstance();
const data = reactive({
  isLogin: false,
  viewHeight:proxy.$viewHeight,
  viewIndex:0,
});

function changeView(num){
  data.viewIndex = num
}

</script>

<style lang="scss">
  @import "@/pages/index.scss";
</style>