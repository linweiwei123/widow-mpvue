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
