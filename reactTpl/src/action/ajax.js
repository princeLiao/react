import {
    Toast
} from 'antd-mobile';
import 
    action
 from 'action/action-interface.js';
/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {number}opt.timeout 超时设置 单位 s
 * @param {function}opt.timeoutFun 请求超时后的回调
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {boolean}opt.appJson 发送的数据格式，true 为Json格式
 * @param {boolean}opt.formData 发送的数据格式，true 为默认格式  false为表单格式
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.cookie = opt.cookie;
    opt.loading=opt.loading||true;
    opt.async = opt.async === false ? false : true;
    opt.data = opt.data || null;
    opt.timeout= opt.timeout||10000;
    opt.success = opt.success || function () {};
    opt.code == undefined ? opt.code = 0 : "";
    opt.r == undefined ? opt.r = 1 : "";
    opt.returnNull = opt.returnNull || function () {};
    var xmlHttp = null,timer=null;
    if(opt.loading){
        Toast.loading("数据加载中...",10);
    }
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [],
        postData = "";
    if (opt.formData) {
        postData = opt.data;
    } else if (opt.appJson && opt.method.toUpperCase() === 'POST') {
        postData = JSON.stringify(opt.data);
    } else {
        for (var key in opt.data) {
            params.push(key + '=' + encodeURIComponent(opt.data[key]) );
            postData = params.join('&');
        }
    }
    opt.cookie===false ? xmlHttp.withCredentials = false :xmlHttp.withCredentials = true;
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            clearTimeout(timer);
            if(opt.loading){
                Toast.hide();
            }
            if (xmlHttp.status == 200) {
                let response;
                if (opt.wmdRule === true) {
                    opt.success(xmlHttp.responseText);
                    return false;
                }
                if (xmlHttp.responseText) {
                    try{
                        response = JSON.parse(xmlHttp.responseText);
                    }
                    catch(e){
                        console.error(e);
                        Toast.hide();
                        return ;
                    }
                   
                } else {
                    if (typeof opt.returnNull === "function") {
                        opt.returnNull()
                    } else {
                        Toast.fail('服务器正忙，请稍后再试');
                    }
                    return;
                }
                typeof opt.always === "function" ? opt.always(response) : "";
                if ((response.r != undefined && response.r == opt.r) || (response.code != undefined && response.code == opt.code)) {
                    opt.success(response.data,response);
                    // 添加第二个参数： 为了配合后端，获取data以外的数据
                } else {
                    if(response.code != undefined && response.code == 10010){
                        //未登录
                        let path=location.pathname;
                        if(path.indexOf(".html")>0){
                            let ii=path.lastIndexOf("/");
                            path=path.slice(0,ii+1);
                        }
                        typeof opt.loginFail === "function" ? opt.loginFail(response) : location.href = action.interface.entryAuth + '&url=' + encodeURIComponent(location.origin + path + '#/login');
                    }else{
                        console.log(response);
                        typeof opt.fail === "function" ? opt.fail(response) : Toast.fail(response.message || response.msg || "接口请求异常", 1.5);
                    }
                  
                }
            } else {
                typeof opt.always === "function" ? opt.always() : ""
                if (typeof opt.error === "function") {
                    opt.error();
                } else {
                    Toast.fail("网络异常，请检测网络", 1.5);
                }
            }
        }
    };
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url + "?t=" + (new Date()).getTime(), opt.async);
        if (opt.appJson) {
            xmlHttp.setRequestHeader('Content-type', 'application/json');
        } else if (!opt.formData) {
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        xmlHttp.send(postData);
    } else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData+(postData?'&':'')+'t='+(new Date()).getTime(), opt.async);
        if (opt.appJson) {
            xmlHttp.setRequestHeader('Content-type', 'application/json');
        }
        else if (!opt.formData) {
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        xmlHttp.send(null);
    }
    /**
     * 超时处理
     * @param async==false 异步请求才有超时
     */
    if(opt.async===true&&opt.timeout){
        timer=setTimeout(function(){
            xmlHttp.abort();
            typeof opt.timeoutFun==="function"?opt.timeoutFun():Toast.fail("请求超时，请重试",1.5);
        },opt.timeout);
    }
  
}

export default ajax;