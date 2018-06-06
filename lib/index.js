import CalenderHotel from './calender-hotel/index';
import CityLocator from './city-locator/index';
import ImagePicker from './image-picker/index';
import Toast from './toast/index';
  
const version = '1.0.0';
  
function install(Vue){
  Vue.prototype.getComponentByTag = (parent, tag) => {
    for (let c of parent.$children) {
      if (c.$options._componentTag === tag) {
        return c
      }
    }
  }
}

export { 
  CalenderHotel,
  CityLocator,
  ImagePicker,
  Toast,
  install 
}
  