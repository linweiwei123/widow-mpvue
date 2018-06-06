## calenderHotel组件使用文档

效果图

![image](http://adstatic.oss-cn-beijing.aliyuncs.com/ad-activity.meiyou.com/dkd2/v4/calender2.png
)

### 引入calenderHotel
在页面中使用(参考 src/pages/calenderHotel/index.vue文件)

加入依赖文件
```
  import CalenderHotel from 'widow-mpvue/lib/calender-hotel/index';

```

component依赖
```
    components: {
        'calender-hotel': CalenderHotel
    },
    mounted (){
      this.calenderHotel = this.getComponentByTag(this,'calender-hotel');
    }

```

**配置日期控件**
```
    calenderConfig:{
      startDate:'2018-05-25', //初始开始日期,可不填
      endDate:'2018-05-28', // 初始结束日期，可不填
      themeColor: '#3EDFBA', //主题颜色，可不填，默认绿色
      months:3 //需要的月份，可不填，默认6个月
    }
```


### 调用

#### 1、简写的方式使用
html

```
    <calender-hotel v-bind:config="calenderConfig" v-on:choosed-date="(date)=>{chooseDate=date}"/>

```
methods
```
    this.calenderHotel.show()

```

**支持的method**


支持方法 | 说明
---|---|---
show | 显示
hide | 隐藏

**支持的options**

支持配置 | 说明
---|---|---
startDate | 初始开始日期,可不填
endDate | 初始结束日期，可不填
themeColor | 主题颜色，可不填，默认绿色
months | 需要的月份，可不填，默认6个月

### 举例说明
```vue
<template>
  <div class="toast-container">
    <div class="button" @click="show">显示日期控局</div>
    <div>所选日期:{{chooseDate.startDate}} ~ {{chooseDate.endDate}}</div>
    <calender-hotel v-bind:config="calenderConfig" v-on:choosed-date="(date)=>{chooseDate=date}"/>
  </div>
</template>

<script>
  import CalenderHotel from 'widow-mpvue/lib/calender-hotel/index';
  export default {
    name: "index",
    data(){
      return {
        count: 0,
        chooseDate: {startDate:'2018-05-25',endDate:'2018-05-28'},
        calenderConfig:{
          startDate:'2018-05-25',
          endDate:'2018-05-28',
          themeColor: '#3EDFBA',
          months:3
        }
      }
    },
    components: {
      'calender-hotel': CalenderHotel
    },
    mounted (){
      this.calenderHotel = this.getComponentByTag(this,'calender-hotel');
    },
    methods: {
      show(){
        this.calenderHotel.show()
      },
      showChooseDate(date){
        console.log('showChooseDate',date);
      }
    }
  }
</script>

<style scoped>
  .button{
    width:100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #dddddd;
    background-color: #fff;
    border-radius: 5px;
    padding: 0;
    text-align: center;
    margin-bottom: 10px;
  }

</style>

```
