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
