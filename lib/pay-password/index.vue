<template>
  <div class="pay-wrapper" v-if="display">
    <div class="pay-container">
      <div class="pay-title"></div>
      <div class="pwd-block" @click="setFocus">
        <div class="password-list">
          <div class="item" v-for="(item,index) in passwords" v-bind:key="index">
            <input type="number" v-model="passwords[index]" disabled >
          </div>
        </div>
        <input type="number" :focus="pwdFocus">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
        props:['config'],
        data(){
          return {
            display: false,
            passwords:['','','','','',''],
            pwdFocus: false
          }
        },
        computed:{
        },
        methods:{
          show(){
            this.display = true;
          },
          method(){
            this.display = false;
          },
          // 点击聚焦
          setFocus() {
            this.pwdFocus = true
          },
          inputBlur(){
            this.pwdFocus = false;
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
    }

    .pwd-block{
      position: relative;
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
      line-height: 50px;
    }


</style>
