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
            <div class="top-info-nickname">小九神<van-tag style="margin-left:0.2rem" size="large" type="warning">大学生</van-tag></div>
            <div class="top-info-introduce">简介:星萤之火可以燎原</div>
            <div class="top-info-province">所属地:广东广州</div>
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
});

onMounted(() => {
  // let token = JSON.parse(localStorage.getItem("token"));
  // data.nickName = token.nickName;
  // data.introduce = token.introduceMe;
  // data.isMan = token.sex;
});

// function pleaseWait() {
//   Toast("暂未开放，敬请期待~");
// }
</script>

<style lang="scss">
@import "@/views/userInfo/components/userInfo.scss";
</style>
