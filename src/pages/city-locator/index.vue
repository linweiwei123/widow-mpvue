<template>
  <div>
    <city-locator v-bind:config="config" v-on:onCity="onCity"></city-locator>
    <toast></toast>
  </div>
</template>

<script>
  import thor from '../../common/thor/thor';
  import Toast from 'widow-mpvue/lib/toast/index';
  import CityLocator from 'widow-mpvue/lib/city-locator/index';
    export default {
        name: "index",
        components:{
          'city-locator': CityLocator,
          'toast':Toast,
        },
        data(){
          return {
            config:{
              baiduMapAk: 'CtBkwEFod02rjaDlGjxYyRtP1BYLR7Fb', // 百度ak
              hotCitys:[], // 热门城市 数组
              choosedCity:{} // 默认选择的城市
            }
          }
        },
        created(){
          // 获取热门数据
          thor.get('https://plan.fjhululu.com/apis/base/citylist')
            .then((cityRet)=>{
                if(cityRet && cityRet.data){
                  this.config.hotCitys = [].concat(cityRet.data.list_hotcity).concat(cityRet.data.list_hotcity).concat(cityRet.data.list_hotcity);
                }
            })
            .catch(err=>{
                // 获取接口失败，提示下错误信息
            })
        },
        mounted(){
          this.toast = this.getComponentByTag(this,'toast');
        },
        methods:{
          onCity(item){
            this.toast.showToast(`选择了${item.city}`)
            // 这里拿到了数据，你把值通过redux传递到需要的页面，然后关闭此页面
          }
        }
    }
</script>

<style scoped>

</style>
