<template>
  <div class="pay-wrapper" v-if="display">
    <div class="pay-container">
      <div class="pay-title">
        <span class="icon-close" @click="hide"></span>
        <span class="text">请输入支付密码</span>
      </div>
      <div class="pwd-block" @tap="setFocus">
        <div class="password-list">
          <div class="item" v-for="(item,index) in passwords" v-bind:key="index">
            <input type="password" v-model="passwords[index]" disabled >
          </div>
        </div>
        <input type="number" :focus="pwdFocus"  @input="handleChange" @blur="inputBlur">
      </div>
    </div>
  </div>
</template>

<script>
    const defaultPwds = ['','','','','',''];
    export default {
        name: "index",
        props:['config'],
        data(){
          return {
            display: false,
            passwords:defaultPwds,
            pwdFocus: true,
            val:''
          }
        },
        computed:{
        },
        methods:{
          show(){
            this.passwords = ['','','','','',''];
            this.display = true;
          },
          hide(){
            this.display = false;
            this.passwords = defaultPwds
          },
          // 点击聚焦
          setFocus() {
            this.pwdFocus = true
          },
          inputBlur(){
            this.pwdFocus = false;
          },
          handleChange(e){
            let val = e.target.value;
            let pwds = val.split('');
            if(pwds.length > 6){
              return;
            }
            else if(pwds.length === 6){
              let passwordsTemp = this.passwords;
              passwordsTemp.splice(0,pwds.length);
              this.passwords = pwds.concat(passwordsTemp);
              this.$nextTick(()=>{
                this.$emit('onPassword',this.passwords.join(''));
              });
            }
            else{
              let passwordsTemp = this.passwords;
              passwordsTemp.splice(0,pwds.length);
              this.passwords = pwds.concat(passwordsTemp);
            }
          }
        }
    }
</script>

<style scoped>
    .pay-wrapper {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
    }

    .pay-container{
      width: 340px;
      box-sizing: border-box;
      height: 130px;
      background-color: #fff;
      position: absolute;
      top: 80px;
      padding: 10px;
      border-radius: 3px;
    }

    .pay-title{
      height: 50px;
      width: 100%;
      display:flex;
      justify-content:start;
    }

    .pay-title>span{
      display: inline-block;
    }

    .pay-title>span.text{
      position:absolute;
      left:50%;
      transform:translateX(-50%);
    }

    .pwd-block{
      position: relative;
    }

    .icon-close{
      width:30px;
      height:30px;
    }

    .pwd-block>input{
      position:relative;
      height: 0;
      width: 0;
      text-indent: -999em;
      left: -100%;
    }

    .password-list{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .password-list .item{
      height: 50px;
      width: 50px;
      border-top: 1px solid rgba(0,0,0,0.6);
      border-left: 1px solid #bbb;
      border-bottom: 1px solid rgba(0,0,0,0.6);
      display: flex;
      justify-content: start;
      align-items: center;
    }

    .password-list .item:first-child{
      border-left: 1px solid rgba(0,0,0,0.6);
    }
    .password-list .item:last-child{
      border-right: 1px solid rgba(0,0,0,0.6);
    }

    .password-list .item input{
      height:80rpx;
      font-size:90rpx;
      text-align:center;
      line-height:120rpx;
      box-sizing:border-box;
      display: inline-block;
    }


</style>
