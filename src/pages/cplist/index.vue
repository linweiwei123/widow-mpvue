<template>
    <div class="wrapper">
      <ul class="list">
        <li>
          <span>1、<a href="/pages/toast/main">toast轻提示</a></span>
        </li>
        <li>
          <span>2、<a href="/pages/calender-hotel/main">时间组件-酒店</a></span>
        </li>
        <li>
          <span>3、<a href="/pages/image-picker/main">图片上传组件</a></span>
        </li>
        <li>
          <span>4、<a href="/pages/city-locator/main">城市定位与选择</a></span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  .wrapper{
    padding: 15px;
  }
  .list{
    padding: 0 20px;
  }
  .list li{
    list-style: none;
    display: block;
    line-height: 30px;
  }
  .list li a{
    color: blue;
    display: inline-block;
  }
</style>
