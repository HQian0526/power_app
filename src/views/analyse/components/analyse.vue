<template>
  <div class="analyse">
    <div class="power">
      <van-cell>
        <template #icon><div class="icon-power"></div></template>
        <template #title><div class="title-power">本月学习雷达</div></template>
      </van-cell>
      <div id="chartView-userInfo" class="chartView-userInfo"></div>
    </div>

    <div class="today-data">
      <van-cell>
        <template #icon><div class="icon-today"></div></template>
        <template #title><div class="title-today">今日数据</div></template>
      </van-cell>
      <div class="today-detail">
        <div class="today-detail-left">
          <div class="left-img"></div>
          <div class="left-data">
            <div class="left-data1">自习室</div>
            <div class="left-data2">5小时</div>
          </div>
        </div>
        <div class="today-detail-right">
          <div class="right-img"></div>
          <div class="right-data">
            <div class="right-data1">探险提升</div>
            <div class="right-data2">5小时</div>
          </div>
        </div>
      </div>
    </div>

    <div class="effict">
      <van-cell>
        <template #icon><div class="icon-effict"></div></template>
        <template #title><div class="title-effict">今日专注率</div></template>
      </van-cell>
      <div id="chartView-effict" class="chartView-effict"></div>
      <div class="effict-detail">
        <div class="effict-good">
          <div class="effict-good-times">专注次数</div>
          <div class="effict-good-color"></div>
          <div class="effict-good-number">30</div>
        </div>
        <div class="effict-bad">
          <div class="effict-bad-times">放弃次数</div>
          <div class="effict-bad-color"></div>
          <div class="effict-bad-number">5</div>
        </div>
      </div>
    </div>

    <div class="compare">
      <van-cell>
        <template #icon><div class="icon-compare"></div></template>
        <template #title><div class="title-compare">数据对比</div></template>
        <template #value>
          <van-tabs @click-tab="onClickTab" v-model:active="active" type="card" color="#FBE5BE" title-inactive-color="#856551" title-active-color="#856551">
            <van-tab title="日"></van-tab>
            <van-tab title="月"></van-tab>
            <van-tab title="年"></van-tab>
          </van-tabs>
        </template>
      </van-cell>
      <div class="compare-conclude">在9月22号这天最努力，完成5个小时专注!</div>
      <div id="chartView-compare" class="chartView-compare"></div>
    </div>

    <div class="calendar">
      <van-cell value="2022-12" arrow-direction="down" is-link>
        <template #icon><div class="icon-calendar"></div></template>
        <template #title><div class="title-calendar">打卡日历</div></template>
      </van-cell>
      <div id="chartView-calendar" class="chartView-calendar"></div>
    </div>
  </div>
</template>

<script setup>
import { onActivated, onMounted, ref, onBeforeUnmount, markRaw } from "vue";
import { reactive, getCurrentInstance } from "vue";
import * as echarts from "echarts";
const _this = getCurrentInstance();
const { $instanceToBottom } = _this.appContext.config.globalProperties;
const analyse = ref()
const data = reactive({
  chart_userInfo: null,
  chart_calendar: null,
  chart_effict: null,
  chart_compare: null,
  compareData:[1,3,2,5,7,4,8],
  dateList: [],
  yearAndMonth:'',
  analyseHeight:$instanceToBottom(analyse._value),
});

onMounted(() => {
  // data.analyseHeight = $instanceToBottom(analyse._value)
  let date = new Date();
  let days = getMonthLength(date.getFullYear(), date.getMonth() + 1);
  let month = (date.getMonth() + 1)>9?date.getMonth() + 1:'0'+(date.getMonth() + 1)
  data.yearAndMonth = date.getFullYear()+'-'+month
  for (let i = 0; i < days; i++) {
    data.dateList[i] = [
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (i + 1),
      i * 10,
    ];
  }
  initChart_userInfo();
  initChart_calendar();
  initChart_effict();
  initChart_compare();
});

//离开该页面时取消渲染
onBeforeUnmount(() => {
  if (
    data.chart_userInfo != null &&
    data.chart_userInfo != "" &&
    data.chart_userInfo != undefined
  ) {
    data.chart_userInfo.dispose();
  }
  if (
    data.chart_calendar != null &&
    data.chart_calendar != "" &&
    data.chart_calendar != undefined
  ) {
    data.chart_calendar.dispose();
  }
  if (
    data.chart_effict != null &&
    data.chart_effict != "" &&
    data.chart_effict != undefined
  ) {
    data.chart_effict.dispose();
  }
  if (
    data.chart_compare != null &&
    data.chart_compare != "" &&
    data.chart_compare != undefined
  ) {
    data.chart_compare.dispose();
  }
});

//获得某个月有多少天
function getMonthLength(year, month) {
  return new Date(year, month, 0).getDate();
}

//切换tab
function onClickTab(val){
  console.log("val",val)
  switch(val.name){
    case 0:
      data.compareData = [1,3,2,5,7,4,8]
      break;
    case 1:
      data.compareData = [1,2,2,8,1,5,3]
      break;
    case 2:
      data.compareData = [6,2,4,1,5,8,8]
      break;
  }
  initChart_compare();
}

//个人雷达图
function initChart_userInfo() {
  const dataBJ = [
  [250, 200, 250, 4, 180, 1],
];
  data.chart_userInfo = echarts.init(
    document.getElementById("chartView-userInfo")
  );
  const lineStyle = {
    width: 0.3,
    opacity: 0.6
  };
  data.chart_userInfo.setOption({
    // backgroundColor: '#83E0DD',
  textStyle:{
    fontSize:12,
    opacity:0.8,
  },
  radar: {
    indicator: [
      { name: '学习时长', max: 300 },
      { name: '专注', max: 250 },
      { name: '成长', max: 300 },
      { name: '毅力', max: 5 },
      { name: '成就', max: 200 },
    ],
    shape: 'circle',
    splitNumber: 5,
    axisName: {
      color:'#1e1e1e'
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(92,92,92, 0.1)',
          'rgba(92,92,92, 0.1)',
          'rgba(92,92,92, 0.1)',
          'rgba(92,92,92, 0.1)',
          'rgba(92,92,92, 0.1)'
        ].reverse()
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(92,92,92, 0.1)'
      }
    },
    nameGap:6,
  },
  series: [
    {
      name: 'Beijing',
      type: 'radar',
      lineStyle: lineStyle,
      data: dataBJ,
      symbol: 'none',
      itemStyle: {
        color: '#61D8C1'
      },
      areaStyle: {
        opacity: 0.6
      }
    },
  ]
  });
}

function initChart_calendar() {
  let lunarData = [];
  for (let i = 0; i < data.dateList.length; i++) {
    lunarData.push([data.dateList[i][0]]);
  }
  data.chart_calendar = echarts.init(
    document.getElementById("chartView-calendar")
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
        cellSize: [40, 40], //日历每格长宽
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

function initChart_effict() {
  data.chart_effict = echarts.init(document.getElementById("chartView-effict"));
  data.chart_effict.setOption({
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        radius: "170%",
        center: ["50%", "85%"],
        itemStyle: {
          color: "#01D295",
          shadowColor: "rgba(0,138,255,0.45)",
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 18,
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 10,
          offsetCenter: [0, "-40%"],
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18,
          },
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          length: 8,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        //刻度字体样式
        axisLabel: {
          distance: 30,
          color: "#999",
          fontSize: 12,
        },
        title: {
          show: false,
        },
        //底部文字百分比样式
        detail: {
          backgroundColor: "#fff",
          borderColor: "#999",
          borderWidth: 0,
          width: "30%",
          lineHeight: 40,
          height: 20,
          borderRadius: 8,
          offsetCenter: [0, "-10%"],
          valueAnimation: true,
          formatter: function (value) {
            return "{value|" + value.toFixed(0) + "}{unit|%}";
          },
          rich: {
            value: {
              fontSize: 25,
              fontWeight: "bolder",
              color: "#777",
            },
            unit: {
              fontSize: 20,
              color: "#999",
              padding: [0, 0, 0, 10],
            },
          },
        },
        data: [
          {
            value: 75,
          },
        ],
      },
    ],
  });
}

function initChart_compare() {
  data.chart_compare = markRaw(
    echarts.init(document.getElementById("chartView-compare"))
  );
  data.chart_compare.setOption({
    grid:{
      top:35,
      bottom:30,
    },
    tooltip: {
      trigger: "axis",
      position: ["50%", 50],
      formatter: (params) => {
        let res =
          params[0].name +
          " : " +
          "<br/>" +
          "专注 " +
          params[0].value +
          " 小时";
        return res;
      },
    },
    xAxis: {
      type: "category",
      data: ["09-21", "09-22", "09-23", "09-24", "09-25", "09-26", "09-27"],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "学习时长(h)",
      min: 0,
      max: 8,
    },
    series: [
      {
        data: data.compareData,
        type: "line",
        itemStyle: {
          color: "#FA6402",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#FEE4D3",
              },
              {
                offset: 1,
                color: "#FFF3EB",
              },
            ],
            global: false,
          },
        },
      },
    ],
  });
}
</script>

<style lang="scss">
@import "@/views/analyse/components/analyse.scss";
</style>