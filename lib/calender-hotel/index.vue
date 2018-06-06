<template>
    <div class="calender-wrapper" v-show="display">
      <div class="header-wrapper">
        <div class="header">
          <span class="header-item close" @click="hide"></span>
          <span class="header-item" @click="ensure">确定</span>
        </div>
        <div class="weeks box">
          <div class="week fs28" v-for="(item,index) in calenda.weeks_ch"  :key="index"  v-bind:data-idx="index">{{item}}
          </div>
        </div>
      </div>
      <div class="month-wrapper">
        <div class="month" v-for="(object,index) in calenda.allDays" :key="index">
          <!--年月-->
          <div class="date-area" style="">
            <div>{{object.year || "--"}} 年 {{object.month || "--"}} 月</div>
          </div>
          <!--日-->
          <div class="days">
            <!--循环空-->
            <div v-if="object.hasEmptyGrid" class="grid white-color" v-for="(emp,index2) in object.empytGrids" :key="index2" v-bind:data-idx="index2"></div>
            <!--循环天-->
            <div class="grid white-color" v-for="(cell,index3) in object.days" :key="index3" v-bind:data-idx="index3"  v-bind:data-object="object" v-on:click="select" style="">
              <!--天-->
              <div :style="{'background-color':cell.status===3?config.themeColor:''}" :class="['day border-radius',cell.status==0 ? 'disable':'enable',{'pink-bg':cell.status===3},{'today':cell.status==1}]">{{cell.day}}</div>

              <!--小标-->
              <div class="day-label">
                <!--今天-->
                <div v-if="cell.status==1" style="color:gray;font-size:12px;text-align:center;">今天</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
      name:'calenderHotel',
      props:['config'],
      data(){
        return {
          calenda:{
            name:''
          },
          display: false,
          config:this.config
        }
      },
      computed: {

      },
      created(){
        //初始化数据
        this.initData = function(cur_year,cur_month) {
          // 计算最近三个月的对象
          var months = this.config.months || 6, monthDataArr = [];
          var mObject0 = this.calculateDays(cur_year, cur_month);
          monthDataArr.push(mObject0);
          for(let i=1;i<months;i++){
            if(cur_month+1>12) {
              cur_year = cur_year+1;
              cur_month = 1;
            }else {
              cur_month = cur_month+1;
            }
            let month = this.calculateDays(cur_year, cur_month);
            monthDataArr.push(month);
          }
          this.calenda.allDays = monthDataArr;
        };
        // =============获取当月有多少天（下个月月初是多少）==========
        this.getThisMonthDays = function(year, month) {
          return new Date(year, month, 0).getDate();
        };
        // =============获取当月第一周第一天是周几===========
        this.getFirstDayOfWeek = function(year, month) {
          return new Date(Date.UTC(year, month - 1, 1)).getDay();
        };
        //====================计算当前年月空的几天 =============
        this.calculateEmptyGrids = function(year, month) {
          const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
          let empytGrids = [];
          if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
              empytGrids.push(i);
            }
          }
          return empytGrids;
        };
        // =====================计算当前年月有哪些天===========
        /**
         * 根据年月计算当前月的天对象状态返回对象
         * mObject 年月对象
         * year  年
         * month 月
         * hasEmptyGrid  是都有空调
         * empytGrids  空天数字
         * days 所有日对象【】
         */
        this.calculateDays = function(year, month) {
          var mObject = {};//月对象
          mObject["year"] = year;
          mObject["month"] = month;
          //计算当前年月空的几天
          var empytGrids = this.calculateEmptyGrids(year, month);
          if(empytGrids.length>0) {
            mObject["hasEmptyGrid"] = true;
            mObject["empytGrids"] = empytGrids;
          }else {
            mObject["hasEmptyGrid"] = false;
            mObject["empytGrids"] = [];
          }
          var days = [];
          var thisMonthDays = this.getThisMonthDays(year, month);//这个月有多少天
          //现在的时间
          var cusDate = new Date(this.calenda.org_year, this.calenda.org_month,this.calenda.org_day);
          var startDate;
          var endDate;
          if(this.calenda.startDate&&this.calenda.endDate) {
            startDate = stringToDate(this.calenda.startDate);
            endDate = stringToDate(this.calenda.endDate);
          }
          if(this.calenda.startDate){
            startDate = stringToDate(this.calenda.startDate);
          }
          for (let i = 1; i <= thisMonthDays; i++) {
            var day = {};
            //加入的时间
            var date = new Date(year, month-1,i);
            //status 0-不可选择 1-当前时间 2-可选择 3-被选中
            day["day"] = i;
            day['date'] = date;
            //比现在的时间比较是大于还是小于，小于则不可点击
            var time = parseInt(calculateTime(date,cusDate));
            if(time<0) {
              day["status"] = 0;
            }else if(time==0) {
              day["status"] = 1;
            }else {
              day["status"] = 2;
            }
            if(this.calenda.startDate&&this.calenda.endDate) {
              var stime = parseInt(calculateTime(date,startDate));
              var etime = parseInt(calculateTime(date,endDate));

              if(stime>=0&&etime<=0) {
                day["status"] = 3;
              }
            }else if(this.calenda.startDate){
              var stime = parseInt(calculateTime(date,startDate));
              if(stime==0) {
                day["status"] = 3;
              }
            }
            days.push(day);
          }
          mObject["days"] = days;
          return mObject;
        };

        if(this.config && this.config.startDate&&this.config.endDate) {
          this.calenda.startDate = this.config.startDate;
          this.calenda.endDate = this.config.endDate;
          this.calStartDate = stringToDate(this.calenda.startDate);
          this.calEndDate = stringToDate(this.calenda.endDate);
        }
        var date = new Date();
        //获取当前的年月
        var cur_year = date.getFullYear();
        var cur_month = date.getMonth() + 1;
        var cur_day = date.getDate();
        const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        //设置数据
        this.calenda.org_year = date.getFullYear();
        this.calenda.org_month = date.getMonth();
        this.calenda.org_day = cur_day;
        this.calenda.weeks_ch = weeks_ch;
        this.initData(cur_year,cur_month);

        // 阻止滚动冒泡
      },
      methods:{
        show(){
          this.display = true
        },
        hide(){
          this.display = false
        },
        select(e){
          var year = e.currentTarget.dataset.object.year;
          var month = e.currentTarget.dataset.object.month;
          var day = e.currentTarget.dataset.idx+1;
          var selectDate = new Date(year,month-1,day);
          //现在的时间
          var cusDate = new Date(this.calenda.org_year, this.calenda.org_month,this.calenda.org_day);
          var time = parseInt(calculateTime(selectDate,cusDate));
          if(time<0) {
            return;
          }
          if(this.calenda.startDate&&this.calenda.endDate) {
            this.calenda.startDate = formatDate(selectDate,"yyyy-MM-dd");
            this.calenda.endDate = null;
            this.calStartDate = stringToDate(this.calenda.startDate);
            this.calEndDate = null;
          }else if(this.calenda.startDate) {
            this.calenda.endDate = formatDate(selectDate,"yyyy-MM-dd");
            this.calEndDate = stringToDate(this.calenda.endDate);
          }else {
            this.calenda.startDate = formatDate(selectDate,"yyyy-MM-dd");
            this.calStartDate = stringToDate(this.calenda.startDate);
          }
          this.initData(this.calenda.org_year, this.calenda.org_month+1);
          //返回选择的时间（有起止时间的时候返回）
          if(this.calenda.startDate&&this.calenda.endDate) {
            var sDate = this.calenda.startDate;
            var eDate = this.calenda.endDate;
          }
          this.setDayStatus();
          this.calenda = JSON.parse(JSON.stringify(this.calenda));
        },
        ensure(){
          this.$emit('choosed-date',{
            startDate:this.calenda.startDate,
            endDate:this.calenda.endDate
          });
          this.hide();
        },
        setDayStatus(){
          for(let i=0;i<this.calenda.allDays.length;i++){
              for(let j=0;j<this.calenda.allDays[i].days.length;j++){
                let dateStr = this.calenda.allDays[i].days[j];
                let cur = new Date(dateStr);
                let start = this.calStartDate?this.calStartDate.getTime():null;
                let end = this.calEndDate?this.calEndDate.getTime():null;
                if(start === cur || end === cur || start?start<cur:true && end?cur<end:true ){
                  this.calenda.allDays[i].days[j]["status"] = 3;
                }
              }
          }
        },
        onScroll(e){
          console.log(e);
        }
      },
  }

    /**
     * 字符串转时间（yyyy-MM-dd HH:mm:ss）
     * result （分钟）
     */
    function stringToDate(fDate){
      var fullDate = fDate.split("-");
      return new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);
    }
    /**
     * 计算两个日期相差几天
     * cusDate 当前时间
     * oriDate  比较时间
     * 返回 正数为cusDate>oriDate
     */
    function calculateTime(cusDate,oriDate) {
      var cusTime = cusDate.getTime();
      var oriTime = oriDate.getTime();
      return (cusTime-oriTime)/(1000*60*60*24)
    }

    /**
     * 格式化日期
     * @param date 日期
     * @param format 格式化样式,例如yyyy-MM-dd HH:mm:ss E
     * @return 格式化后的金额
     */
    function formatDate(date, format) {
      var v = "";
      if (typeof date == "string" || typeof date != "object") {
        return;
      }
      var year  = date.getFullYear();
      var month  = date.getMonth()+1;
      var day   = date.getDate();
      var hour  = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var weekDay = date.getDay();
      var ms   = date.getMilliseconds();
      var weekDayString = "";

      if (weekDay == 1) {
        weekDayString = "星期一";
      } else if (weekDay == 2) {
        weekDayString = "星期二";
      } else if (weekDay == 3) {
        weekDayString = "星期三";
      } else if (weekDay == 4) {
        weekDayString = "星期四";
      } else if (weekDay == 5) {
        weekDayString = "星期五";
      } else if (weekDay == 6) {
        weekDayString = "星期六";
      } else if (weekDay == 7) {
        weekDayString = "星期日";
      }

      v = format;
      //Year
      v = v.replace(/yyyy/g, year);
      v = v.replace(/YYYY/g, year);
      v = v.replace(/yy/g, (year+"").substring(2,4));
      v = v.replace(/YY/g, (year+"").substring(2,4));

      //Month
      var monthStr = ("0"+month);
      v = v.replace(/MM/g, monthStr.substring(monthStr.length-2));

      //Day
      var dayStr = ("0"+day);
      v = v.replace(/dd/g, dayStr.substring(dayStr.length-2));

      //hour
      var hourStr = ("0"+hour);
      v = v.replace(/HH/g, hourStr.substring(hourStr.length-2));
      v = v.replace(/hh/g, hourStr.substring(hourStr.length-2));

      //minute
      var minuteStr = ("0"+minute);
      v = v.replace(/mm/g, minuteStr.substring(minuteStr.length-2));

      //Millisecond
      v = v.replace(/sss/g, ms);
      v = v.replace(/SSS/g, ms);

      //second
      var secondStr = ("0"+second);
      v = v.replace(/ss/g, secondStr.substring(secondStr.length-2));
      v = v.replace(/SS/g, secondStr.substring(secondStr.length-2));

      //weekDay
      v = v.replace(/E/g, weekDayString);
      return v;
    }

</script>

<style scoped>
  .calender-wrapper{
    position: absolute;
    z-index: 2;
    background-color: #fff;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    animation: bottomUp 0.3s ease-in-out ;
  }

  .header-wrapper{
    position:fixed;
    width:100%;
    box-sizing:border-box;
    border-bottom:1px solid #ddd;
    background-color:#fff;
    height: 65px;
  }

  .header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:4px 15px;
    height:40px;
    margin-top:-10px;
  }
  .header-item{
    color:#068EEF;
    font-size:16px;
    line-height:50px;
    width:50px;
    text-align:right;
  }
  .close-container{
    height: 50px;
    width: 50px;
  }
  .close{
    width:30px;
    height:30px;
    fill: #068EEF;
    background-size: cover;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='cross' viewBox='0 0 44 44' width='100%25' height='100%25'%3E%3Cpath fill-rule='evenodd' d='M24.008 21.852l8.97-8.968L31.092 11l-8.97 8.968L13.157 11l-1.884 1.884 8.968 8.968-9.24 9.24 1.884 1.885 9.24-9.24 9.24 9.24 1.885-1.884-9.24-9.24z'%3E%3C/path%3E%3C/svg%3E");
  }
  .month-wrapper{
    margin-top: 65px;
  }
  .month{
    display: block;
  }
  .box {
    display: flex;
    align-content: center;
    align-items: center;
  }

  .pink-color {
    color: rgb(64, 70, 128);
  }
  .white-color {
    color: #fff;
  }

  .fs28 {
    font-size: 28rpx;
  }

  /* pages/calendar/calendar.wxss ====================================*/

  .date-area {
    width:100%;
    padding:5px 20px;
    text-align:left;
    font-size:12px;
    background-color:rgb(241,243,246);
  }
  .weeks {
    margin: -6px 0 10px 0;
    height: 50rpx;
    line-height: 50rpx;
  }
  .week {
    flex: 1;
    text-align: center;
  }
  .days {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    padding:10px 0 5px 0;
  }
  .grid {
    display: flex;
    width: 107.1428571429rpx;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin: 0;
    text-align: center;
    /*border: 1px solid lightgray;*/
  }
  .day {
    width:35px;
    padding:0;
    color:black;
    font-size:14px;
    font-weight:700;
    text-align:center;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .day-label{
    height: 15px;
  }
  .today{
    background-color: aliceblue;
  }
  .border-radius {
    border-radius: 50%;
  }
  .disable {
    color: lightgray;
  }
  .pink-bg {
    color:#fff
  }
  .purple-bg {
    background-color: #b8b8f1;
  }
</style>
