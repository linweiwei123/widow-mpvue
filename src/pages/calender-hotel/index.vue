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
        console.log(this.calenderHotel);
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
