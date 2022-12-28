<template>
  <div class="card-view">
    <div class="card-left">
      <div class="card-left-img">
        <van-image
          fit="cover"
          round
          width="100%"
          height="100%"
          :src="imgUrl"
        />
      </div>
    </div>
    <div class="card-right">
      <div class="card-right-nickname">{{props.title}}</div>
      <div class="card-right-introduce">
        {{props.content}}
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title:{
    type:String,
    default:''
  },
  content:{
    type:String,
    default:''
  },
  imgUrl:{
    type:String,
    default:''
  }
})
</script>

<style lang="scss">
@import "./productionCard.scss";
</style>
