
## 👩🏿‍🎤 widow-mpvue(黑寡妇UI)

## 安装与启动

``` bash
npm install widow-mpvue --save-d
```

## 依赖模块说明

```vue

/** 引入widow ui css **/
import 'widow-mpvue/lib/widow-css/index.css';

/** 引入widow-mpvue **/
import { install as widowInstall } from 'widow-mpvue'

/** 安装后给vue component 添加一些方法 如 getComponentByTag() **/
widowInstall(Vue);

```

## 获取组件对象方法

### 方法一

```vue
  // 获取组件给vue组件（即this）赋toast属性
  this.toast = this.getComponentByTag(this,'toast');

  // 使用
  this.toast.showToast('文字')

```

###　方法二

```vue
    // 标签上增加ref
    <widow-toast ref="toast"></widow-toast>

    // 使用
    this.$refs.toast.showToast('文字')

```

## 注意

如果你还使用其他组件，建议名都以 widow-xxx来命名


## 👩🏿‍🎤 widow-mpvue(黑寡妇UI) 使用说明文档

1. [toast](./lib/toast/zh-CN.md) 吐司轻提示
2. [calenderHotel](./lib/calender-hotel/zh-CN.md) 日期控件
3. [imagePicker](./lib/image-picker/zh-CN.md) 上传图片组件
4. [cityLocator](./lib/city-locator/zh-CN.md) 城市定位与选择
