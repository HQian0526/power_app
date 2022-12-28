<template>
  <van-overlay :show="data.showView" @click="closeBag">
    <div class="wrapper" @click.stop>
      <div class="bagView">
        <div class="tabs">
          <van-tabs v-model:active="active" swipeable color="#43ACFF">
            <van-tab title="物品" name="own" title-class="tabTitle">
              <van-grid border :square="data.gridSquare">
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
              </van-grid>
              <van-grid border>
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
              </van-grid>
              <van-grid border>
                <van-grid-item icon="photo-o" text="文字" />  
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
              </van-grid>
              <van-grid border>
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
              </van-grid>
              <van-pagination
                v-model="currentPage"
                :page-count="12"
                mode="simple"
              />
              
            </van-tab>
            <van-tab title="地图" name="map" title-class="tabTitle">
              <van-grid border :square="data.gridSquare">
                <van-grid-item icon="photo-o" text="萤火之森" @click="clickMapGrid(1)"/>
                <van-grid-item icon="photo-o" text="测试换肤" @click="clickMapGrid(2)"/>
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
              </van-grid>
              <van-grid border>
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
              </van-grid>
              <van-grid border>
                <van-grid-item icon="photo-o" text="文字" />  
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
              </van-grid>
              <van-grid border>
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
              </van-grid>
              <van-pagination
                v-model="currentPage"
                :page-count="12"
                mode="simple"
              />
            </van-tab>
          </van-tabs>
        </div>
        <div class="backButton">
          <van-button @click="closeBag" style="height: 40px" size="large" round type="primary" >返回</van-button>
        </div>
      </div>
      <div></div>
    </div>
  </van-overlay>
</template>

<script setup>
import { reactive, watch, defineEmits } from "vue";
import { Dialog } from "vant";
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
  active:0,
  gridSquare:true,
  showView: false,
});

const closeBag = () => {
  data.showView = false;
  em("closeBag");
};

const clickMapGrid = (num) => {
  data.mapId = num
  em("changeMap",num)
  closeBag()
}

// 监听
watch(
  () => props.visible,
  (newVal, oldVal) => {
    if (newVal) {
      data.showView = true;
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