<template>
  <div class="widow-image-picker">
    <!--内部边距控制-->
    <div class="widow-image-picker-list">
      <!-- 每行4个图 -->
      <div class="widow-flex" v-for="(line,index) in listFiles" v-bind:key="index">
        <!-- 块级边距控制 -->
        <div class="widow-flex-item" v-for="(item,index2) in line" v-bind:key="index2">
          <!-- 图片块 -->
          <div class="widow-image-picker-item" v-if="item.url">
            <div class="widow-image-picker-item-remove" @click="del(index2)"></div>
            <div class="widow-image-picker-item-content" :style="{'background-image':'url(' + (item.path?item.path:item.url) + ')'}" @click="imageClick(item)">
            </div>
          </div>
          <!-- 添加块 -->
          <div class="widow-image-picker-upload-btn" v-else-if="item.type==='add'" @click="upload" >
            <div class="add-ori"></div>
            <div class="add-her"></div>
            <div class="loading-masker" v-if="uploading">
              <div class="icon loading" ></div>
            </div>
          </div>
          <!-- 占位块 -->
          <div class="widow-image-picker-item" v-else></div>
        </div>

      </div>
    </div>
    <widow-toast/>
  </div>
</template>

<script>
    import thor from '../common/thor/thor';
    import { getComponentByTag } from "../common/utils/helper";
    import widowToast from '../toast/index';
    const defaultConfig = {
      count: 1,
      sizeType: ['original','compressed'],
      maxImage: 4,
      sizeOverMsg: '图片太大了'
    };
    export default {
        name: "imagePicker",
        props: ['config','data'],
        data(){
          return {
            files:[],
            listFiles:[],
            calFiles:[],
            options: Object.assign(defaultConfig,this.config||{}),
            token:'',
            uploading: false,
            previewHost:''
          }
        },
        components:{
          'widow-toast': widowToast
        },
        computed: {
          changeFiles(){
            this.files = (this.data||[]).concat([{
              type:'add'
            }])
          },
          calculateFiles(){
            let l = this.files.length;
            let lineNumber = Math.floor(l / 4);
            this.listFiles = [];
            // 根据总数进行分行
            let tempArr = [];
            if(lineNumber>0){
              for(let i=0;i<lineNumber;i++){
                this.listFiles.push(this.files.slice(4*i,4*i+4))
              }
            }
            // 其余的用空对象补齐
            if(l % 4 !== 0){
              tempArr = this.files.slice(4*lineNumber,l);
              let lackNum = 4 - l % 4;
              for(let i = 0;i<lackNum;i++){
                tempArr.push({})
              }
            }
            this.listFiles.push(tempArr);
          }
        },
        created(){
          thor.post(this.options.tokenUrl)
            .then(res=>{
              this.token = res.data.qiniuToken;
              this.previewHost = res.data.DOMAIN
            })
            .catch(err=>{
              this.$emit('errorHandler',err);
            });

          this.getFilesInfo = function(){
            // 数据做下转换，反馈给父组件
            let files = formatFiles(this.files);
            return files;
          }
        },
        mounted(){
          this.toast = getComponentByTag(this,'widow-toast');
        },
        methods:{
          upload(){
            const cfg = this.options;
            const token = this.token;
            const that = this;
            wx.chooseImage({
              count: cfg.count,
              sizeType: cfg.sizeType,
              success: function(res) {
                var filePath = res.tempFilePaths[0];
                var fileName = filePath.split('//')[1];
                // 限制大小
                if(typeof that.options.maxSize !== 'undefined'){
                  var fileInfo = res.tempFiles[0];
                  if(fileInfo.size > that.options.maxSize * 1000){
                    that.toast.showToast(that.options.sizeOverMsg);
                    return;
                  }
                }

                // 上传七牛云
                that.uploading = true;
                wx.uploadFile({
                  url: cfg.serverUrl,
                  filePath: filePath,
                  name: 'file',
                  formData:{
                    'token': token,
                    'key': fileName
                  },
                  success: function(res){
                    that.uploading = false;
                    if(res && res.statusCode === 200){
                      let url = `${cfg.previewHost}/${JSON.parse(res.data).key}`;

                      let spliceNumber = 0;
                      if(that.files.length === that.options.maxImage){
                        spliceNumber = 1
                      }

                      // 数组倒一个元素前插入
                      that.files.splice(that.files.length-1,spliceNumber,{
                        path:filePath,
                        url:url
                      });

                    }
                    else{
                      that.$emit('errorHandler',res.data);
                    }
                  }
                })
              }
            })
          },
          del(id){
            this.files.splice(id,1)
            // 删除文件时判断是否有容纳空间，并且不存在添加模块
            if(this.files.length<this.options.maxImage){
              let hasAdd = this.files.some((item)=>{
                return item.type === 'add'
              });
              if(!hasAdd){
                this.files.push({
                  type:'add'
                })
              }
            }
          },
          imageClick(item){
            this.$emit('onImageClick',item)
          },
          reFresh(){

          }
        }
    }

    function formatFiles(files){
      let tempArr = [];
      files.forEach((item)=>{
        if(typeof item.url !== "undefined" && item.type !== 'add'){
          tempArr.push(item.url);
        }
      });
      return tempArr;
    }
</script>

<style scoped>
    .widow-image-picker{
      background-color: white;
    }
    .widow-image-picker-list{
      padding: 9px 8px 0;
      margin-bottom: 10px;
    }
    .widow-image-picker-list .widow-flex{
      margin-bottom: 6px;
    }
    .widow-image-picker-list .widow-flex-item{
      position: relative;
      margin-right: 5px;
    }
    .widow-image-picker-list .widow-flex-item:nth-child(4n){
      margin-right: 0;
    }
    .widow-image-picker-item{
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .widow-image-picker-item-remove{
      display: block;
      width: 15px;
      height: 15px;
      position: absolute;
      right: 6px;
      top: 6px;
      text-align: right;
      vertical-align: top;
      z-index: 2;
      background-size: 15px auto;
      background-image: url("data:image/svg+xml;charset=utf-8,<svg%20width%3D'16'%20height%3D'16'%20viewBox%3D'0%200%2016%2016'%20version%3D'1.1'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'><g%20id%3D'Page-1'%20stroke%3D'none'%20stroke-width%3D'1'%20fill%3D'none'%20fill-rule%3D'evenodd'><circle%20id%3D'Oval-98'%20fill-opacity%3D'0.4'%20fill%3D'%23404040'%20cx%3D'8'%20cy%3D'8'%20r%3D'8'><%2Fcircle><path%20d%3D'M11.8979743%2C11.8990375%20L11.8979743%2C11.8990375%20C11.7633757%2C12.0336542%2011.5447877%2C12.0336542%2011.4101891%2C11.8990375%20L8%2C8.48838931%20L4.5887341%2C11.8990375%20C4.45413554%2C12.0336542%204.23554748%2C12.0336542%204.10094892%2C11.8990375%20L4.10094892%2C11.8990375%20C3.96635036%2C11.7644208%203.96635036%2C11.5458033%204.10094892%2C11.4111866%20L7.51221482%2C8.00053847%20L4.10202571%2C4.58881335%20C3.96742715%2C4.45419667%203.96742715%2C4.23557919%204.10202571%2C4.10096251%20L4.10202571%2C4.10096251%20C4.23662427%2C3.96634583%204.45521233%2C3.96634583%204.58981089%2C4.10096251%20L8%2C7.51268762%20L11.4112659%2C4.10203944%20C11.5458645%2C3.96742276%2011.7644525%2C3.96742276%2011.8990511%2C4.10203944%20L11.8990511%2C4.10203944%20C12.0336496%2C4.23665612%2012.0336496%2C4.45527361%2011.8990511%2C4.58989029%20L8.48778518%2C8.00053847%20L11.8979743%2C11.4122636%20C12.0325729%2C11.5468803%2012.0325729%2C11.7644208%2011.8979743%2C11.8990375%20L11.8979743%2C11.8990375%20Z'%20id%3D'Shape'%20fill%3D'%23FFFFFF'%20transform%3D'translate(8.000000%2C%208.000000)%20scale(1%2C%20-1)%20translate(-8.000000%2C%20-8.000000)%20'><%2Fpath><%2Fg><%2Fsvg>");
    }
    .widow-image-picker-item-content{
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .widow-image-picker-item-content:after{
      content: '';
      padding-bottom: 100%;
    }
    .widow-image-picker-upload-btn{
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 3px;
      box-sizing:border-box;
    }
    .widow-image-picker-upload-btn .loading-masker{
      width: 100%;
      height: 100%;
    }
    .loading-masker{
      position: absolute;
      display:flex;
      justify-content:center;
      align-items:center;
      background-color: rgba(58,58,58,0.65);

    }

    .widow-image-picker-upload-btn .add-ori{
      width:25px;
      height:1px;
      background-color:#ccc;
      top:50%;
      position:absolute;
      left:50%;
      transform:translate(-50%,-50%);

    }
    .widow-image-picker-upload-btn .add-her{
      width:1px;
      height:25px;
      background-color:#ccc;
      top:50%;
      position:absolute;
      left:50%;
      transform:translate(-50%,-50%);
    }
  .widow-image-picker-upload-btn input{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    height: 100%;
  }
</style>
