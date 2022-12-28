<template>
  <div id="app">
      <div id="content" :style="{height:data.viewHeight}"><router-view /></div>
      <div v-show="$route.name!=='login'" class="bottom-nav">
        <van-tabbar route>
          <van-tabbar-item replace to="/home" icon="home-o"
            >星萤</van-tabbar-item
          >
          <van-tabbar-item replace to="/analyse" icon="medal-o"
            >数据分析</van-tabbar-item
          >
          <van-tabbar-item replace to="/store" icon="shop-o"
            >商店</van-tabbar-item
          >
          <van-tabbar-item replace to="/userInfo" icon="user-o"
            >个人中心</van-tabbar-item
          >
        </van-tabbar>
      </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance} from "vue";
const { proxy } = getCurrentInstance();
const data = reactive({
  isLogin: false,
  viewHeight:proxy.$viewHeight,
});

</script>

<style lang="scss">
  @import "@/pages/index.scss";
</style>