<template>
    <van-dialog v-model:show="data.show" show-cancel-button :show-confirm-button="data.showConfirm" cancel-button-text="关闭" @cancel="cancelDailySign" cancel-button-color="#01AA8E">
      <template #title>
        <div class="content-title">签到成功!</div>
      </template>
      <div id="chart-calendar" class="chart-calendar" v-if="data.show"></div>
    </van-dialog>
</template>

<script setup>
import { getCurrentInstance, reactive, onMounted, ref, onBeforeUnmount, watch, defineEmits, nextTick } from "vue";
import { Dialog, Toast } from "vant";
import { numFilter } from "@/filter/filter.js";
import { selectUserInfo } from "@/api/about";
import * as echarts from "echarts";
const emit = defineEmits(["resetTab",]);

const data = reactive({
  chart_calendar: null,
  dateList: [],
  yearAndMonth:'',
  show:false,
  showConfirm:false
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  intoData:{
    type: Array,
    default: ()=>[]
  }
});

onMounted(() => {
  
});

//离开该页面时取消渲染
onBeforeUnmount(() => {
  if (
    data.chart_calendar != null &&
    data.chart_calendar != "" &&
    data.chart_calendar != undefined
  ) {
    data.chart_calendar.dispose();
  }
});

//获得某个月有多少天
function getMonthLength(year, month) {
  return new Date(year, month, 0).getDate();
}

//关闭弹窗
function cancelDailySign(){
  data.show = false
  emit('resetTab')
}

function initChart_calendar() {
  let lunarData = [];
  for (let i = 0; i < data.dateList.length; i++) {
    lunarData.push([data.dateList[i][0]]);
  }
  data.chart_calendar = echarts.init(
    document.getElementById("chart-calendar")
  );
  data.chart_calendar.setOption({
    tooltip: {
      formatter: function (params) {
        return "学习时长: " + Number(params.value[1]).toFixed(2) + "h";
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 300,
      calculable: true,
      seriesIndex: [2],
      orient: "horizontal",
      left: "center",
      bottom: 20,
      inRange: {
        color: ["#e0ffff", "#44D5A2"],
        opacity: 0.3,
      },
      controller: {
        inRange: {
          opacity: 0.9,
        },
      },
    },
    calendar: [
      {
        left: "center",
        top: "middle",
        cellSize: [32, 32], //日历每格长宽
        yearLabel: { show: false },
        orient: "vertical",
        dayLabel: {
          margin: 20,
          firstDay: 1, //第一列是星期几
        },
        monthLabel: {
          show: false,
        },
        range: data.yearAndMonth,
      },
    ],
    series: [
      {
        type: "scatter",
        coordinateSystem: "calendar",
        symbolSize: 1,
        label: {
          show: true,
          formatter: function (params) {
            var d = echarts.number.parseDate(params.value[0]);
            return d.getDate();
          },
          color: "#000",
        },
        data: lunarData,
      },
      {
        type: "scatter",
        coordinateSystem: "calendar",
      },
      {
        name: "学习时长",
        type: "heatmap",
        coordinateSystem: "calendar",
        data: data.dateList,
      },
    ],
  });
}

// 监听
watch(
  () => props.visible,
  (newVal, oldVal) => {
    if (newVal) {
      data.show = true;
      let date = new Date();
      let days = getMonthLength(date.getFullYear(), date.getMonth() + 1); //判断某个月有多少天
      let month = (date.getMonth() + 1)>9?date.getMonth() + 1:'0'+(date.getMonth() + 1)
      data.yearAndMonth = date.getFullYear()+'-'+month
      let perDay = ''
      if(props.intoData.length>0){
        for (let i = 0; i < days; i++) {
          perDay = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (i + 1>9?i+1:'0'+(i+1))
          data.dateList[i] = [perDay,0];
          for(let j = 0;j<props.intoData.length;j++){
            let signday = props.intoData[j].signTime.split('T')[0]
            if(perDay===signday){
              data.dateList[i] = [perDay,300];
            }
          }
        }
      }else{
        for (let i = 0; i < days; i++) {
          perDay = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (i + 1)
          data.dateList[i] = [perDay,0];
        }
      }
      
      nextTick(() => {
        initChart_calendar();
      })
      
    }
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);
</script>

<style lang="scss">
@import "@/views/home/components/dailySign.scss";
</style>
