import ajax from "../../action/ajax.js";
import action from "../../action/action-interface.js";
import { Toast } from 'antd-mobile';
let wx = window.wx;
let helper={};
// 微信配置
helper.wxConfig = function ( successCb, errorCb) {
    let _this = this;
    if (wx ) {
      ajax({
        method: 'GET',
        url: action.activity.getShareCfg,
        data: {
          currentUrl:encodeURIComponent(location.href.split('#')[0]) 
        },
        always:function(data){
            if (data && data.flag) {
                //配置微信
                wx.config({
                  debug: action.debug,
                  appId: data.data.appid,
                  timestamp: data.data.timestamp,
                  nonceStr: data.data.nonce,
                  signature: data.data.signature,
                  jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'getLocation'
                  ]
                });
                //验证成功
                wx.ready(function () {
                  successCb && successCb();
                });
                //验证失败
                wx.error(function (res) {
                  errorCb && errorCb(res);
                  /* eslint-disable */
                  console.error(res);
                  /* eslint-enable */
                });
              }
              else {
                let message = '操作失败，请重试。';
                if (data && data.message) {
                  message = data.message;
                }
                Toast.fail(message);
              }
        },
        success:function(){

        },
        fail:function(){
            
        }
      });
    }
  };
  export default helper;