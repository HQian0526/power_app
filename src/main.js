import { createApp } from 'vue'
import App from '@/pages/index.vue'
import router from '@/pages/index.js'
import '@/assets/iconfont/iconfont.css';
import axios from 'axios'
import md5 from 'js-md5'
import echarts from 'echarts'

//注册全局组件
import { Checkbox, CheckboxGroup, Radio, RadioGroup, Tag, Icon, Form, Field, Button, Image, Progress, Tabbar, TabbarItem, DropdownItem, DropdownMenu, Popover, Toast, Dialog, Swipe, SwipeItem, Card, Tab, Tabs, Cell, CellGroup, Overlay, Grid, GridItem, Pagination } from 'vant';

//获得div顶部距离页面底部的高度
const instanceToBottom = (dom) => {
  console.log(dom)
  let instanceRes = 0
  if(dom){
    let remRes =  setFontSize()
    instanceRes = (((window.innerHeight - (dom.offsetTop - window.pageYOffset))/remRes).toFixed(2)-1.5)+'rem'
  }
  return instanceRes
}

//获得当前设备的屏幕高度
function getViewHeight(){
  let remRes =  setFontSize()
  let htmlHeight = document.documentElement.clientHeight|| document.body.clientHeight;
  let viewHeight = ((htmlHeight/remRes).toFixed(2)-1.5)+'rem'
  return viewHeight
}

//配置rem适配大小
const setFontSize= () => {
    const htmlDom = document.getElementsByTagName('html')[0];
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (htmlWidth >= 750) {
      htmlWidth = 750;
    }
    if (htmlWidth <= 320) {
      htmlWidth = 320;
    }
    htmlDom.style.fontSize = `${htmlWidth / 10}px`
    return htmlWidth / 10
  };

  window.onresize = setFontSize;
  setFontSize()

const app = createApp(App);
// 默认请求的基础url（如果axios请求的地址不带域名，自动添加baseURL）（默认请求域名，/当前域名）
axios.defaults.baseURL = "/"
// 设置post请求头的content-Type值
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求超时5000毫秒
axios.defaults.timeout = 5000;

//把axios挂载到vue上，并起一个叫$http的名字
// app.config.globalProperties.$http = axios

//挂载echarts
// Vue.prototype.$echarts = echarts(vue2)
// app.config.globalProperties.$echarts = echarts

//页面跳转时判断是否需要登录
router.beforeEach(function(to, from, next){
    if(to.meta.needLogin){
        if(localStorage.getItem('username'))return next()
        next({path:'/login'})
    }
    return next()
}),

//挂载
app.config.globalProperties.$instanceToBottom = instanceToBottom
app.config.globalProperties.$viewHeight = getViewHeight()
app.config.globalProperties.$md5 = md5
app.use(router)
    .use(Icon)
    .use(Tag)
    .use(Button)
    .use(Image)
    .use(Progress)
    .use(Tabbar)
    .use(TabbarItem)
    .use(DropdownItem)
    .use(DropdownMenu)
    .use(Popover)
    .use(Toast)
    .use(Dialog)
    .use(Swipe)
    .use(SwipeItem)
    .use(Card)
    .use(Tab)
    .use(Tabs)
    .use(Cell)
    .use(CellGroup)
    .use(Overlay)
    .use(Grid)
    .use(GridItem)
    .use(Pagination)
    .use(Form)
    .use(Field)
    .use(Radio)
    .use(RadioGroup)
    .use(Checkbox)
    .use(CheckboxGroup)
    .mount('#app')
