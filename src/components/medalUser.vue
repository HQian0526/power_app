<template>
  <div class="medalUser">
    <div v-if="order===0">
        <van-image
        fit="cover"
        round
        width="30px"
        height="30px"
        :src="require('@/assets/medal/first.png')"
      />
    </div>
    <div v-else-if="order===1">
        <van-image
        fit="cover"
        round
        width="30px"
        height="30px"
        :src="require('@/assets/medal/second.png')"
      />
    </div>
    <div v-else-if="order===2">
        <van-image
        fit="cover"
        round
        width="30px"
        height="30px"
        :src="require('@/assets/medal/third.png')"
      />
    </div>
    <div v-else :class="sex===1?'orderNumBoy':'orderNumGirl'">
      {{order+1}}
    </div>
    <div class="headimgs">
      <van-image
        fit="cover"
        round
        width="50px"
        height="50px"
        :src="require('@/assets/home/girl.jpg')"
      />
    </div>
    <div class="nameLevel">
      <div :class="sex===1?'nickNamesBoy':'nickNamesGirl'">11111111</div>
      <div class="levelGirl" v-if="sex===0"><span class="icon-woman iconfont"></span>Lv.88</div>
      <div class="levelBoy" v-if="sex===1"><span class="icon-man iconfont"></span>Lv.88</div>
    </div>
    <div :class="sex===1?'learnHourBoy':'learnHourGirl'">
      {{learnHour}} 小时
    </div>
  </div>
</template>

<script>
export default {
    props:{
        order:{
          type:String,
          default:''
        },
        sex:{
          type:String,
          default:''
        },
        learnHour:{
          type:String,
          default:'0'
        }
    },
  data() {
    return {
    };
  },
//   watch:{
//       order(newValue,oldValue){
//           console.log("1111111")

//       }
//   },
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss">
@import "./medalUser.scss";
</style>