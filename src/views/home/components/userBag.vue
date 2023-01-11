<template>
    <van-dialog v-model:show="data.showView" show-confirm-button confirm-button-text="关闭" @confirm="closeBag" confirm-button-color="#01AA8E" theme="round-button">
      <div class="wrapper">
        <div class="tabs">
          <div :class="data.tabIndex===0?'tabs-item-choose':'tabs-item'" @click="changeTabs(0)">消耗品</div>
          <div :class="data.tabIndex===1?'tabs-item-choose':'tabs-item'" @click="changeTabs(1)">其他</div>
        </div>
        <div class="tab-item-left">
          <van-grid border square :column-num="3" >
            <van-grid-item v-for="(item,index) in data.bagList" @click="useGood(item.goodsName)">
              <template #icon>
                <div class="grid-img">
                  <van-image
                    width="1rem"
                    height="1rem"
                    :src="item.goodsUrl"
                  />
                </div>
              </template>
              <template #text>
                <div class="grid-font">{{ item.goodsName }}<span class="rest-num">[{{ item.goodsUserEntities.gNum }}]</span></div>
              </template>
            </van-grid-item>
          </van-grid>
          <div class="tab-bottom">已经到底部了~</div>
        </div>
    </div>
    <van-dialog v-model:show="data.confirmUse" show-cancel-button confirm-button-text="同意" @confirm="checkUse" @cancel="cancelUse" cancel-button-color="#01AA8E" confirm-button-color="#fff">
      <div class="use-tip">确认使用一个【{{data.goodName}}】？</div>
    </van-dialog>
  </van-dialog>
</template>

<script setup>
import { reactive, watch, defineEmits } from "vue";
import { openUserBag } from "@/api/home";
const em = defineEmits(["closeBag","changeMap"]);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  bagInfo: {
    type: Array,
    default: [],
  },
});

const data = reactive({
  mapId:'',
  tabIndex:0,
  gridSquare:true,
  showView: false,
  bagList:[],
  confirmUse:false,
  goodName:'',
});

const closeBag = () => {
  data.showView = false;
  em("closeBag");
};

function useGood(name){
  data.goodName = name
  data.confirmUse = true
}

function checkUse(){

}

function cancelUse(){
  
}

function changeTabs(num){
  data.tabIndex = num
  let token = JSON.parse(localStorage.getItem("token")) 
  let requestData = {}
  if(num===0){
    requestData = {userId:token.userId,typeId:10000}
  }else{
    requestData = {userId:token.userId,typeId:10001}
  }
  openUserBag(requestData).then((res) => {
    if(res.code===0){
      data.bagList = JSON.parse(JSON.stringify(res.content.list))
    }else{
      Toast("加载物品超时，请重试~")
    }
  }) 
}

// 监听
watch(
  () => props.visible,
  (newVal, oldVal) => {
    if (newVal) {
      data.tabIndex = 0
      data.bagList = props.bagInfo
      data.showView = true
    }
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);
</script>

<style lang="scss">
@import "./userBag.scss";
</style>