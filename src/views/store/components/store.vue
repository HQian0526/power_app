<template>
  <div class="store">
    <div class="store-top">
      <div class="store-none"></div>
      <div class="xy-store"></div>
      <div class="store-money">
        <div class="money-border">
          <div class="money-num">1000</div>
          <div class="money-icon"></div>
        </div>
      </div>
    </div>
    <!-- tab-none占位 -->
    <div class="tab-none"></div>
    <div class="tab">
      <div :class="data.tabIndex===0?'tab-page-choose':'tab-page'" @click="clickTab(0)">消耗品</div>
      <div :class="data.tabIndex===1?'tab-page-choose':'tab-page'" @click="clickTab(1)">装备</div>
      <div :class="data.tabIndex===2?'tab-page-choose':'tab-page'" @click="clickTab(2)">实物兑换</div>
    </div>
    <!-- 消耗品 -->
    <div class="store-xh" ref="store_xh" :style="{height:data.storeHeight}">
      <div class="box"></div>
      <div v-for="(item,index) in data.store_good_list" :key="key">
        <div class="green-store" v-if="index===0 || index%2 == 0">
          <div class="green-store-top"></div>
          <div class="green-store-body">
            <div class="green-store-middle">
              <img style="margin-top:0.3rem;width: 2rem;height: 2rem;" :src="item.url[0]" :srcset="item.url[1]+' 2x,'+item.url[2]+' 3x'"/>
            </div>
            <div class="green-store-bottom">
              <div class="xh-name">
                {{item.name}}
                {{item.price}}
                <img style="width: 0.5rem;height: 0.5rem;" :src="require('@/assets/store/money.png')" :srcset="require('@/assets/store/money@2x.png')+' 2x,'+require('@/assets/store/money@3x.png')+' 3x'"/>
              </div>
              <van-button color="linear-gradient(to bottom, #53CBF5, #378BF7, #4BC2FE)" round size="small">立即兑换</van-button>
            </div>
          </div>
        </div>
        <div class="yellow-store" v-else>
          <div class="yellow-store-top"></div>
          <div class="yellow-store-body">
            <div class="yellow-store-middle">
              <img style="margin-top:0.3rem;width: 2rem;height: 2rem;" :src="item.url[0]" :srcset="item.url[1]+' 2x,'+item.url[2]+' 3x'"/>
            </div>
            <div class="yellow-store-bottom">
              <div class="xh-name">
                {{item.name}}
                {{item.price}}
                <img style="width: 0.5rem;height: 0.5rem;" :src="require('@/assets/store/money.png')" :srcset="require('@/assets/store/money@2x.png')+' 2x,'+require('@/assets/store/money@3x.png')+' 3x'"/>
              </div>
              <van-button color="linear-gradient(to bottom, #53CBF5, #378BF7, #4BC2FE)" round size="small">立即兑换</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { reactive, onMounted, getCurrentInstance, ref} from "vue";
import { store_xh_list, store_zb_list, store_sw_list } from "@/views/store/config/config"
const store_xh = ref()
const _this = getCurrentInstance();
const { $instanceToBottom } = _this.appContext.config.globalProperties;
    const data = reactive({
      //背景图
      boxUrl:require("@/assets/store/box.png"),
      tabIndex:0,
      storeHeight:$instanceToBottom(store_xh._value),
      store_good_list:store_xh_list,
    });

onMounted(() => {
  data.storeHeight = $instanceToBottom(store_xh._value)
})

//切换tab页
function clickTab(num){
  data.tabIndex = num
  switch(num){
    case 0:
      data.store_good_list = store_xh_list;
      break;
    case 1:
      data.store_good_list = store_zb_list;
      break;
    case 2:
      data.store_good_list = store_sw_list;
      break;
  }
}
</script>

<style lang="scss">
@import "@/views/store/components/store.scss";
</style>
