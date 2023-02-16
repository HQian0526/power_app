<template>
  <div class="userInfo">
    <div class="top-back">
      <div class="top-icon">
        <van-icon name="chat-o" />
        <van-icon name="setting-o" />
      </div>
      <div class="top-info">
        <div class="top-info-head">
          <div class="top-info-left">
            <div class="top-info-img">
              <van-image
                fit="cover"
                round
                width="100%"
                height="100%"
                :src="require('@/assets/home/girl.jpg')"
              />
            </div>
          </div>
          <div class="top-info-right">
            <!-- <van-tag style="margin-left:0.2rem" size="large" type="warning">大学生</van-tag> -->
            <div class="top-info-nickname">{{data.userInfo.nickName}}<span :class="data.userInfo.sex==='01'?'iconfont icon-man':'iconfont icon-woman'"></span></div>
            <div class="top-info-introduce">简介:{{data.userInfo.introduceMe}}</div>
            <div class="top-info-province">所属地:{{data.userInfo.city}}</div>
          </div>
          <div class="top-info-end">
            <div class="iconfont icon-arrowright"></div>
          </div>
        </div>
        <div class="top-info-like">
          <div class="info-great">
            <div class="info-great-number">1000</div>
            <div class="info-great-text">获赞</div>
          </div>
          <div class="info-great">
            <div class="info-great-number">1000</div>
            <div class="info-great-text">关注</div>
          </div>
          <div class="info-great">
            <div class="info-great-number">1000</div>
            <div class="info-great-text">粉丝</div>
          </div>
        </div>
      </div>
    </div>

    <div class="xy-sociation">
      <ProductionCard :title="data.sociateTitle" :content="data.sociateContent" :imgUrl="require('@/assets/home/girl.jpg')"/>
    </div>

    <div class="xy-orderAndInvite">
      <div class="order"><ProductionCard :title="data.orderTitle" :content="data.orderContent" :imgUrl="require('@/assets/home/girl.jpg')"/></div>
      <div class="invite"><ProductionCard :title="data.inviteTitle" :content="data.inviteContent" :imgUrl="require('@/assets/home/girl.jpg')"/></div>      
    </div>

    <div class="xy-myHome">
      <van-cell title="个人主页" value="历史进程" is-link />
      <div class="non-photo">
        <van-image :src="require('@/assets/userInfo/non-photos.png')" />
      </div>
      <div class="non-photo-tip">您还没有发布动态哦，快去记录学习历程吧！</div>
    </div>
  </div>
</template>

<script setup>
import defaultHead from "@/assets/home/defaultHead.png";
import ProductionCard from "@/components/productionCard";
import { onMounted, reactive } from "vue";
// const userInfo = ref()
const data = reactive({
  active: 0,
  defaultHead: defaultHead,
  isMan: false,
  introduce: "",
  nickName: "",
  percentageExp: 50,
  sociateTitle:'星萤社区',
  sociateContent:'不积跬步无以至千里，不积小流无以成江海',
  orderTitle:'我的订单',
  orderContent:'查看兑换订单',
  inviteTitle:'邀请好友',
  inviteContent:'邀请送金币',
  userInfo:{}
});

onMounted(() => {
  // data.userInfo = JSON.parse(localStorage.getItem("token"));
  initInfo();
});

function initInfo(){
  let token = JSON.parse(localStorage.getItem("token"))
  console.log("token",token)
  if(token!==null){
    data.userInfo = {
      nickName:token.nickName||'暂无昵称',
      introduceMe:token.introduceMe||'这个人很懒，啥都没写~',
      city:token.city||'暂无',
    }
  }
}
</script>

<style lang="scss">
@import "@/views/userInfo/components/userInfo.scss";
</style>
