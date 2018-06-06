import Vue from 'vue'
import App from './App'
import store from './store/store'

/** 引入widow ui **/
import 'widow-mpvue/lib/widow-css/index.css';
import { install as widowInstall } from 'widow-mpvue'

widowInstall(Vue);
/** 引入widow ui **/

Vue.config.productionTip = false;
// 注意此处与web种Vuex的使用区别，目前只有这个方法可行
Vue.prototype.$store = store;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

// 每个页面都有一个main.js 用来实现小程序的页面配置
export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/cplist/main',
      'pages/index/main',
      'pages/toast/main',
      'pages/calender-hotel/main',
      'pages/image-picker/main',
      'pages/city-locator/main',
      'pages/pay-password/main',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
      "list": [
        {
          "pagePath": "pages/index/main",
          "text": "首页"
        },
        {
          "pagePath": "pages/cplist/main",
          "text": "组件"
        }
      ]
    },
  }
}
