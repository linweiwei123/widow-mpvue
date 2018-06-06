## PayPassword组件使用文档

效果图

![image](http://ovn18u9yn.bkt.clouddn.com/pay-password.jpg?imageView2/1/w/375/h/667)

### 说明
1、此主键用于show 输入支付密码弹框=>关闭=>获得密码

### 引入pay-password
在页面中使用(参考 src/pages/pay-password/index.vue文件)

加入依赖文件
```
  import PayPassword from 'widow-mpvue/lib/pay-password/index';

```

component依赖
```
    components:{
      'widow-pay-password': PayPassword
    }
    mounted(){
      this.payPassword = this.getComponentByTag(this,'widow-pay-password');
    }
```


### 调用

html

```
      <widow-pay-password v-on:onPassword="onPassword"></widow-pay-password>

```
methods

1、显示
```
     this.payPassword.show();

```
2、关闭 （关闭会清空数据）
      this.payPassword.hide();
```

**支持的事件**
```vue
      // 密码回传事件，密码输入6位时回传
      onPassword(password){
        this.pwd = password;
        // 关闭弹框
      }
```

**支持的方法**
支持方法 | 说明
---|---
show | 显示
hide | 关闭，清空

**支持的事件**
支持事件 | 说明
---|---
onPassword | 回传密码

### 举例说明
```vue
<template>
    <div>
      <button class="line-btn" @click="showPayPassword">显示支付密码弹框</button>
      <widow-pay-password v-on:onPassword="onPassword"></widow-pay-password>
      <div>  密码 : {{pwd}}</div>
    </div>
</template>

<script>
    import PayPassword from 'widow-mpvue/lib/pay-password/index';
    export default {
        name: "index",
        components:{
          'widow-pay-password':PayPassword
        },
        data(){
          return {
            pwd:''
          }
        },
        mounted(){
          this.payPassword = this.getComponentByTag(this,'widow-pay-password');
        },
        methods:{
          showPayPassword(){
            this.payPassword.show();
          },
          onPassword(password){
            this.pwd = password;
            this.payPassword.hide();
          }
        }
    }
</script>

<style scoped>

</style>

```
