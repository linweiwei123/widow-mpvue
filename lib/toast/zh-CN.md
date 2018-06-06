## toast组件使用文档

效果图

![image](http://adstatic.oss-cn-beijing.aliyuncs.com/ad-activity.meiyou.com/dkd2/v4/toast.png)

### 引入toast

在页面中使用(参考 src/pages/toast/index.vue文件)

加入依赖文件
```
    import Toast from 'widow-mpvue/lib/toast/index';
```

component依赖
```
    components: {
      'widow-toast': Toast
    }

```

### 调用

#### 1、简写的方式使用

```
    规则：this.toast[method]('提示信息');

    举例：this.toast.success( '简单使用');
```
```
    规则： this.toast[method](options);

    举例： this.toast.success({
              message: '操作成功！',
              masker: false
            });

```

**支持的method**


支持方法 | 说明
---|---|---
success | 成功提示
fail | 失败提示
loading | loading提示
nonet | 无网络提示

**支持的options**

支持配置 | 说明
---|---|---
icon | 图标，支持success、fail、loading、nonet
masker | true为有透明背景遮罩（防止误触）、false为无背景遮罩
message | 提示
image | 自定义图标（==*尚未支持==）

#### 2、复杂的方式使用
```
    规则：this.toast.showToast(option);

    举例：this.toast.showToast({
      message: '只有文字！'
    });
```

### 举例说明

```vue
<template>
  <div class="toast-container">
    <div class="button" @click="text">text only</div>
    <div class="button" @click="toastSuccess">success</div>
    <div class="button" @click="toastError">fail</div>
    <div class="button" @click="toastLoading">loading</div>
    <div class="button" @click="nonet">no network</div>
    <div class="button" @click="nomasker">no masker</div>
    <div class="button" @click="clickTry">点击测试</div>
    <div class="center">{{count}}</div>
    <h2>简写举例</h2>
    <div class="button" @click="simple">simple</div>
    <widow-toast></widow-toast>
  </div>
</template>

<script>
    import Toast from 'widow-mpvue/lib/toast/index';
    export default {
        name: "index",
        data(){
          return {
            count: 0
          }
        },
        components: {
          'widow-toast': Toast
        },
        mounted (){
          this.toast = this.getComponentByTag(this,'widow-toast');
        },
        methods: {
          text(){
            this.toast.showToast({
              message: '只有文字！'
            });
          },
          toastSuccess(){
            this.toast.showToast({
              icon: 'success',
              message: '操作成功！'
            });
          },
          toastError(){
            this.toast.showToast({
              icon: 'fail',
              message: '操作失败！'
            });
          },
          toastLoading(){
            this.toast.showToast({
              icon: 'loading',
              message: 'loading!!!',
              duration:200000
            });
          },
          nonet(){
            this.toast.showToast({
              icon: 'nonet',
              message: '网络断开了!!!'
            });
          },
          nomasker(){
            this.toast.showToast({
              message: '没有遮罩层',
              masker:false
            });
          },
          clickTry(){
            this.count ++
          },
          simple(){
            this.toast.success( '简单使用');
          }
        }
    }
</script>

<style scoped>

  .toast-container{
    height: 100%;
    padding: 15px;
    background-color: #f5f5f9;
  }

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
