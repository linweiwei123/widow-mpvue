<template>
    <div class="toast" :class="toast.masker===true?'toast-maker':'nomasker'" @click="clearToast" v-if="toast.show" >
      <div class="widow-toast-wrapper">
        <div class="widow-toast-icon" v-if="toast.icon || toast.image">
          <div class="icon" :class="toast.icon"></div>
          <!--<icon v-bind:type="toast.icon" size="40" color="rgb(255,255,255)"/>-->
        </div>
        <div class="widow-toast-text" v-if="toast.message">
          <div>{{toast.message}}</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'toast',
        data () {
          return {
            toast: {}
          }
        },
        created(){
          ['success','fail','loading','nonet'].forEach(item=>{
            this[item] = (message)=>{
              const options = formatConfig(message);
              const config = {
                show: true,
                icon: item,
                image: options.image,
                masker: typeof options.masker === "undefined",
                message: options.message
              };
              const duration = options.duration || 2000;
              this.toast = config;
              const timer = setTimeout(()=>{
                this.clearToast();
              },duration);
              this.toast.timer = timer;
            }
          });
          console.log(this);
        },
        methods: {

          // toast显示
          showToast(message){
            const options = formatConfig(message);
            const config = {
              show: true,
              icon: options.icon,
              image: options.image,
              masker: typeof options.masker === "undefined",
              message: options.message
            };
            const duration = options.duration || 2000;
            this.toast = config;
            const timer = setTimeout(()=>{
              this.clearToast();
            },duration);
            this.toast.timer = timer;
          },

          // 清除toast
          clearToast(){
            const { timer = 0} = this.toast || {};
            clearTimeout(timer);
            this.toast.show = false;
          }
        }
    }

    function formatConfig(message){
      if(typeof message === 'object'){
          return message;
      }
      return {
        message
      }
    }
</script>

<style scoped>

    .toast {
      position: absolute;
    }

    .toast.toast-maker{
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      -webkit-box-align: center;
      justify-content: center;
      align-items: center;
    }

    .toast.nomasker{
      transform: translate(-50%,-50%);
      top: 50%;
      left: 50%;
    }

    .widow-toast-wrapper{
      z-index: 1999;
      text-align: center;
      display: inline-block;
      max-width: 70%;
      background-color: rgba(58,58,58,0.9);
      line-height: 1.5;
      font-size: 14px;
      padding: 12px 18px;
      border-radius: 3px;
      min-width: 60px;
    }

    .widow-toast-icon{
      margin-bottom: 5px;
    }

    .widow-toast-text {
      color: #fff;
    }


</style>
