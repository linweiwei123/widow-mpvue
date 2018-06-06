<template>
    <div>
      <button class="line-btn" @click="showPayPassword">显示支付密码弹框</button>
      <widow-pay-password></widow-pay-password>
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

          }
        },
        mounted(){
          this.payPassword = this.getComponentByTag(this,'widow-pay-password');
        },
        methods:{
          showPayPassword(){
            this.payPassword.show();
          }
        }
    }
</script>

<style scoped>

</style>
