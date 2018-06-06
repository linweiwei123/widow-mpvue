<template>
  <div>
    <image-picker v-bind:config="config" v-bind:data="initialData" v-on:errorHandler="error" v-on:onImageClick="onImageClick" ></image-picker>
    <button class="line-btn" @click="getFilesInfo">获取文件列表信息</button>
    <button class="line-btn" @click="initData">初始化数据</button>
    <button class="line-btn" @click="clearData">清空数据</button>
    <div>
      <p class="text" v-for="(item,index) in files" :key="index">{{index}}: {{item}}</p>
    </div>
  </div>
</template>

<script>
    import ImagePicker from 'widow-mpvue/lib/image-picker/index';
    import Toast  from 'widow-mpvue/lib/toast/index';
    export default {
        name: "index",
        data(){
          return {
            config:{
              // 获取token地址
              tokenUrl: 'https://plan.fjhululu.com/apis/base/getQiniuToken',
              // 上传的服务器地址
              serverUrl: 'https://upload.qiniup.com/',
              // 查看https://developers.weixin.qq.com/miniprogram/dev/api/media-picture.html#wxchooseimageobject
              sizeType:['original','compressed'],
              // 最多支持上传的文件
              maxImage: 4,
              // 限制单个图片上传的大小，单位kb
              maxSize: 1000,
              // 图片太大提示语
              sizeOverMsg: '图片太大了'
            },
            initialData:[],
            files:[]
          }
        },
        components:{
          'image-picker': ImagePicker,
          'widow-toast': Toast
        },
        mounted (){
          this.imagePicker = this.getComponentByTag(this,'image-picker');
          this.toast = this.getComponentByTag(this,'widow-toast');
        },
        methods:{
          error(err){
            // 此处用 toast提示
            console.log('error',err);
            this.toast.fail('上传失败');
          },
          getFilesInfo(){
            let files = this.imagePicker.getFilesInfo()
            this.files = files;
            console.log('获取的到文件信息：',files);
          },
          onImageClick(item){
            wx.previewImage({
              current: '', // 当前显示图片的http链接
              urls: [item.path] // 需要预览的图片http链接列表
            })
          },
          initData(){
            this.initialData = [{
              id:'123',
              url:'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
            }]
          },
          clearData(){
            this.initialData = []
          }
        }
    }
</script>

<style scoped>
.text{
  font-size: 12px;
}
  .line-btn{
    margin-top: 10px;
  }
</style>
