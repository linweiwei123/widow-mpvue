import utils from './utils';

function Thor(){
    this.defaults = {
        method: 'GET',
        header: {
            'content-type': 'application/json'
        }
    };
}

Thor.prototype.request = function request(config){
    config = utils.merge(this.defaults, config);
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.url,
            data: config.data,
            header: config.header,
            method: config.method.toUpperCase(),
            success: function(res) {
               resolve(res);
            },
            fail: function (err) {
               reject(err)
            }
        })
    })
};

utils.forEach(['delete','get'],function forEachMethodNoData(method){
    Thor.prototype[method] = function (url, config) {
      config = utils.merge(this.defaults, config);
      return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                header: config.header,
                method: method.toUpperCase(),
                success: function(res) {
                  console.log('[API返回]:', res);
                  if(res && res.data){
                      resolve(res.data);
                  }
                  else{
                    reject(res.data);
                  }
                },
                fail: function (err) {
                  console.log('[fail]: 请求失败');
                    reject(err)
                }
            })
        })
    }
});

utils.forEach(['post', 'put', 'patch'],function forEachMethodNoData(method){
    Thor.prototype[method] = function (url, data, config) {
      config = utils.merge(this.defaults, config);
      return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: data,
                header: config.header,
                method: method.toUpperCase(),
                success: function(res) {
                    resolve(res.data);
                },
                fail: function (err) {
                    reject(err)
                }
            })
        })
    }
});

var thor = new Thor();

export default thor;
