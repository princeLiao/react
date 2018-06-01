let util = {};
util.cookie = {
  setCookie: function (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
  },
  getCookie: function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  },
  delCookie: function (cname) {
    let cval = this.getCookie(cname);
    let exp = new Date();
    exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = cname + "=" + cval + "; expires=" + exp.toGMTString();
  }
};
//用户借钱 保留两位小数 向上取值
util.toFixed=(point,len,percent)=>{
  if(percent===true){
    point=Math.ceil(Number(point)*Math.pow(10,len+2))/(Math.pow(10,len));
    var str=point.toFixed(len)+"%";
    return str;
  }else{
    point=Math.ceil(Number(point)*Math.pow(10,len))/(Math.pow(10,len));
    var str=point.toFixed(len);
    return str;
  }
}
//解析URL查询参数
util.parseQueryString = () => {
  let query = {};
  let search = window.location.href;
  let index=search.indexOf('?');
  if (index >= 0) {
    search=search.slice(index+1);
    let searchAfter="";
    if(search.indexOf('?')>0){
      searchAfter="&"+search.split("?")[1];
      search=search.split("?")[0];
    }
    if(search.indexOf('#')>0){
      search=search.split("#")[0];
    }
    let parameters = (search+searchAfter).split('&');
    for (let i = 0; i < parameters.length; i++) {
      let p = parameters[i];
      let kv = p.split('=');
      if (kv.length == 2) {
        let k = kv[0];
        let v = kv[1];
        if (k) {
          query[k] = decodeURIComponent(v);
        }
      }
    }
  }
  return query;
};

//拼接URL查询参数
util.joinQueryString = (query) => {
  let search = '?';

  for (let key in query) {
    let value = query[key];
    if (typeof (value) === 'undefined') {
      value = '';
    }
    value = encodeURIComponent(value);
    search += key + '=' + value + '&';
  }
  if (search[search.length - 1] == '&') {
    search = search.substring(0, search.length - 1);
  }

  return search;
};

//解析hash查询参数
util.parseHashString = () => {
  let query = {};
  let hash = window.location.hash;

  if (hash.indexOf('#') == 0) {
    let parameters = hash.slice(1).split('&');
    for (let i = 0; i < parameters.length; i++) {
      let p = parameters[i];
      let kv = p.split('=');
      if (kv.length == 2) {
        let k = kv[0];
        let v = kv[1];
        if (k) {
          query[k] = decodeURIComponent(v);
        }
      }
    }
  }

  return query;
};

//拼接hash查询参数
util.joinHashString = (query) => {
  let hash = '#';

  for (let key in query) {
    let value = query[key];
    value = encodeURIComponent(value);
    hash += key + '=' + value + '&';
  }
  if (hash[hash.length - 1] == '&') {
    hash = hash.substring(0, hash.length - 1);
  }

  return hash;
};

//解析URL
util.parseUrl = (url) => {
  let a = document.createElement('a');
  a.href = url;
  return {
    hash: a.hash,
    host: a.host,
    hostname: a.hostname,
    href: a.href,
    origin: a.origin,
    pathname: a.pathname,
    port: a.port,
    protocol: a.protocol,
    search: a.search,

    username: a.username,
    password: a.password,

    params: (function () {
      let ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
    path: a.pathname.replace(/^([^\/])/, '/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
    segments: a.pathname.replace(/^\//, '').split('/')
  };
};

//检查指定URL是否同域
util.isEqOrigin = (url) => {
  let remote = util.parseUrl(url);
  let local = window.location;

  return remote.origin.toLowerCase() == local.origin.toLowerCase()
};

//安全过滤
util.safetyFilter = (unsafeString) => {
  if (unsafeString) {
    let text = document.createTextNode(unsafeString);
    let div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
  }

  return unsafeString;
};

//替换br为CRLF
util.brToCrlf = (brString) => {
  let reg = /<\s*br\s*\/?\s*>/ig;

  if (brString) {
    return brString.replace(reg, '\n');
  }

  return brString;
};

//替换CRLF为br
util.crlfToBr = (crlfString) => {
  let reg = /(\r\n)|(\n)/g;

  if (crlfString) {
    return crlfString.replace(reg, '<br/>');
  }

  return crlfString;
};

//检验身份证号码
util.isIDNo = (cid) => {
  let arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  let arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  if (/^\d{17}\d|x$/i.test(cid)) {
    let sum = 0,
      idx;
    for (let i = 0; i < cid.length - 1; i++) {
      sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
    }
    idx = sum % 11;
    return (arrValid[idx] == cid.substr(17, 1).toUpperCase());
  } else if (/^\d{15}$/.test(cid)) {
    let year = cid.substring(6, 8);
    let month = cid.substring(8, 10);
    let day = cid.substring(10, 12);
    let temp_date = new Date(year, parseInt(month) - 1, parseInt(day));
    return (temp_date.getFullYear() == (parseInt(year) + 1900) && temp_date.getMonth() == (parseInt(month) - 1) && temp_date.getDate() == parseInt(day));
  } else {
    return false;
  }
};

//检验手机号
util.isMobile = (mobile) => {
  let reg = /^1\d{10}$/;
  return reg.test(mobile);
};

//检验银行卡号
util.isBankCard = (cardId) => {
  let reg = /^\d{16,}$/;
  return reg.test(cardId);
};

// 掩盖手机号码
util.maskMobile = (mobile) => {
  if (mobile && mobile.length == 11) {
    return mobile.slice(0, 3) + '****' + mobile.slice(7);
  }

  return mobile;
}

//字符串格式化
util.stringFormat = (...rest) => {
  let format = rest[0];
  let args = rest[1];
  let result = format;
  if (rest.length > 1) {
    if (rest.length == 2 && typeof (args) == 'object') {
      for (let key in args) {
        if (args[key] != undefined) {
          let reg = new RegExp('({' + key + '})', 'g');
          result = result.replace(reg, args[key]);
        }
      }
    } else {
      for (let i = 1; i < rest.length; i++) {
        if (rest[i] != undefined) {
          let reg = new RegExp('({)' + (i - 1) + '(})', 'g');
          result = result.replace(reg, rest[i]);
        }
      }
    }
  }
  return result;
};

//毫秒转换为 yyyy-MM-dd HH:mm:ss
util.msecToString = (timestamp, format) => {
  let ret = '';

  if (timestamp && format) {
    let time = new Date(timestamp);

    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let second = time.getSeconds();
    let millisecond = time.getMilliseconds();

    month = month < 10 ? ('0' + month) : month;
    date = date < 10 ? ('0' + date) : date;
    hour = hour < 10 ? ('0' + hour) : hour;
    minutes = minutes < 10 ? ('0' + minutes) : minutes;
    second = second < 10 ? ('0' + second) : second;
    millisecond = millisecond < 10 ? ('00' + millisecond) : (millisecond < 100 ? ('0' + millisecond) : millisecond);

    ret = format;
    ret = ret.replace(/yyyy/g, year);
    ret = ret.replace(/MM/g, month);
    ret = ret.replace(/dd/g, date);
    ret = ret.replace(/HH/g, hour);
    ret = ret.replace(/mm/g, minutes);
    ret = ret.replace(/ss/g, second);
    ret = ret.replace(/fff/g, millisecond);
  }
  return ret;
};

//yyyy-MM-dd HH:mm:ss 转换为Date
util.stringToDate = (dateString) => {
  let ret = undefined;

  let r = '([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})( ([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2}))?)?';
  if (dateString) {
    let d = dateString.match(new RegExp(r));
    if (d) {
      ret = new Date(d[1] - 0, d[2] - 1, d[3] - 0);
      if (d[5]) {
        ret.setHours(d[5] - 0);
      }
      if (d[6]) {
        ret.setMinutes(d[6] - 0);
      }
      if (d[8]) {
        ret.setSeconds(d[8] - 0);
      }
    }
  }

  return ret;
};

//千分位分割数字
util.thousandSeparator = (number) => {
  if (number) {
    let strNum = number.toString();
    let match = strNum.match(/^(\d+)(\.\d+)?$/);
    if (match) {
      let integer = match[1];
      let fraction = match[2] ? match[2] : '';
      if (integer.length > 3) {
        let source = integer.split('');
        let target = [];

        for (let i = 0; i < source.length; i++) {
          let index = (source.length - 1) - i;
          let item = source[index];

          target.push(item);
          if (((i + 1) % 3) == 0 && i != (source.length - 1)) {
            target.push(',');
          }
        }

        integer = target.reverse().join('');
        return integer + fraction;
      }
    }
  }

  return number;
};

//过滤字符串中特殊字符，避免破坏JSON结构。
util.stringJsonFilter = (source, hideCode) => {
  /*
   * 参考资料：
   * http://blog.codemonkey.cn/archives/437
   */
  // let toString = Object.prototype.toString;
  // let isArray = Array.isArray || (a)=> {
  //   return toString.call(a) === '[object Array]';
  // };
  let escMap = {
    '"': '\\"',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t'
  };
  let escFunc = (m) => {
    let value = escMap[m];
    if (value) {
      //后台可正常处理这些字符，故而不再处理。
      //return value;
      return m;
    } else if (hideCode) {
      return ' '; //用空格占位
    } else {
      return '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substring(1);
    }
  };
  let escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;

  //只处理字符串类型
  if (typeof (source) != 'string') {
    return source;
  } else {
    let target = source.replace(escRE, escFunc);
    return target;
  }
};



//是否支持 Web Storage
util.supportStorage = (() => {
  if (window.sessionStorage) {
    try {
      let item = 'wd-sessionStorage-test';
      window.sessionStorage.setItem(item, item);
      window.sessionStorage.removeItem(item);
      return true;
    } catch (e) {
      return false;
    }
  }
  else {
    return false;
  }
})();

//Ract Router 垫片
util.reactRouterPollyfill = (() => {
  return {
    location: {
      getStateOrQuery: (location) => {
        let ret = util.supportStorage ? location.state : location.query;
        ret = ret ? ret : {};
        return ret;
      }
    },
    history: {
      setStateOrQuery: (data) => {
        let ret = {};
        if (util.supportStorage) {
          ret.state = data;
        }
        else {
          ret.query = data;
        }
        return ret;
      }
    }
  };
})();

/**
 * 获取当前 Route 链中最后一个拥有指定属性的 Route 实例。
 *
 * 路由格式如下：
 * <Router>
 *   <Route path="/" prop="Route1" component={Route1}>
 *     <Route path="Route2" prop="Route2" component={Route2} />
 *     <Route path="Route3" prop="Route3" component={Route3} />
 *   </Route>
 * </Router>
 *
 * 调用方式如下：
 * class Route1 extends React.Component {
 *   render() {
 *     let prop = util.getLastRouteProp(this, 'prop');
 *   }
 * }
 */
util.getLastRouteProp = (routeComponent, prop) => {
  if (routeComponent && prop && routeComponent.props) {
    let routes = routeComponent.props.routes; //当前显示内容的 Route 实例链
    if (routes && routes.length > 0) {
      for (let i = routes.length - 1; i >= 0; i--) {
        let route = routes[i];
        if (route && (typeof (route[prop]) != 'undefined')) {
          return route[prop];
        }
      }
    }
  }
  return undefined;
}

// 官网金钱格式化
util.formatMoney = function (number) {
  var beforePoint = '',
    afterPoint = '',
    newArr = [],
    beforeNumber = '';

  var text = parseFloat(number);

  if (text < 0) {
    beforeNumber = '-';
    text = Math.abs(text);
  }

  text += '';

  if (text.indexOf('.') != -1) {
    text = parseFloat(text).toFixed(3) + '';
    text = text.substring(0, text.lastIndexOf('.') + 3);
    var arr = text.split('.');
    beforePoint = arr[0];
    afterPoint = arr[1] == '00' ? '' : ('.' + arr[1]);
  } else {
    beforePoint = text;
  }

  var specialArr = beforePoint.split('');
  specialArr.reverse();
  var len = specialArr.length;

  for (var i = 1; i <= len; i++) {
    newArr.push(specialArr[i - 1]);
    if (i % 3 == 0 && i != 0 && i != len) {
      newArr.push(',');
    }
  }
  beforePoint = newArr.reverse();
  beforePoint = beforePoint.join('');
  return beforeNumber + beforePoint + afterPoint;
};

// 原官网加密方式start
// 特殊数据提交加密
util.encode = function (input) {
  var unicodetoBytes = function (s) {
    var result = new Array();
    if (s == null || s == '') return result;
    result.push(255);
    result.push(254);
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i).toString(16);
      if (c.length == 1) i = '000' + c;
      else if (c.length == 2) c = '00' + c;
      else if (c.length == 3) c = '0' + c;
      var var1 = parseInt(c.substring(2), 16);
      var var2 = parseInt(c.substring(0, 2), 16);
      result.push(var1);
      result.push(var2)
    }
    return result
  };
  var keyStr = 'ABCDEFGHIJKLMNOP' + 'QRSTUVWXYZabcdef' + 'ghijklmnopqrstuv' + 'wxyz0123456789+/' + '=';
  var newlet = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
  input = unicodetoBytes(input);
  var output = '';
  var chr1, chr2, chr3 = '';
  var enc1, enc2, enc3, enc4 = '';
  var i = 0;
  do {
    chr1 = input[i++];
    chr2 = input[i++];
    chr3 = input[i++];
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = '';
    enc1 = enc2 = enc3 = enc4 = ''
  } while (i < input.length);
  var random1 = Math.round(Math.random() * 61) + 0;
  var random2 = Math.round(Math.random() * 61) + 0;
  var random3 = Math.round(Math.random() * 61) + 0;
  var random4 = Math.round(Math.random() * 61) + 0;
  var random5 = Math.round(Math.random() * 61) + 0;
  var random6 = Math.round(Math.random() * 61) + 0;
  var random7 = Math.round(Math.random() * 61) + 0;
  var random8 = Math.round(Math.random() * 61) + 0;
  var random9 = Math.round(Math.random() * 61) + 0;
  var random10 = Math.round(Math.random() * 61) + 0;
  var random11 = Math.round(Math.random() * 61) + 0;
  var random12 = Math.round(Math.random() * 61) + 0;
  var random13 = Math.round(Math.random() * 61) + 0;
  var random14 = Math.round(Math.random() * 61) + 0;
  var random15 = Math.round(Math.random() * 61) + 0;
  var random16 = Math.round(Math.random() * 61) + 0;
  var random17 = Math.round(Math.random() * 61) + 0;
  var random18 = Math.round(Math.random() * 61) + 0;
  var random19 = Math.round(Math.random() * 61) + 0;
  var random20 = Math.round(Math.random() * 61) + 0;
  return (newlet[random1] +
    newlet[random2] +
    newlet[random3] +
    newlet[random4] +
    newlet[random5] +
    newlet[random6] +
    newlet[random7] +
    newlet[random8] +
    newlet[random9] +
    newlet[random10] + output +
    newlet[random11] +
    newlet[random12] +
    newlet[random13] +
    newlet[random14] +
    newlet[random15] +
    newlet[random16] +
    newlet[random17] +
    newlet[random18] +
    newlet[random19] +
    newlet[random20])
};

// 特殊数据获取解密
util.bytesToUnicode = function (bs) {
  var result = '';
  var offset = 0;
  if (bs.length >= 2 && bs[0] == 255 && bs[1] == 254) offset = 2;
  for (var i = offset; i < bs.length; i += 2) {
    var code = bs[i] + (bs[i + 1] << 8);
    result += String.fromCharCode(code)
  }
  return result;
};
// 原官网加密方式end

//trim方法,去除所有空格换行tab符
util.trim = function (value) {
  return value.replace(/\s/g, '');
}

//生成hash值
util.hash = function (input) {
  let hash = 5381, I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');;
  let i = input.length - 1;
   if (typeof input == 'string') {
      for (; i > -1; i--)
         hash += (hash << 5) + input.charCodeAt(i);
   }
   else {
      for (; i > -1; i--)
         hash += (hash << 5) + input[i];
   }
  let value = hash & 0x7FFFFFFF;
  let retValue = '';
   do {
      retValue += I64BIT_TABLE[value & 0x3F];
   }
   while (value >>= 6);
   return retValue;
}

//时间戳转时间
util.transformTime = function(timestamp) {
    if (!timestamp) return '';
    let date = new Date(parseInt(timestamp));
    return date.getFullYear() + '-' + util.toSecondNum((date.getMonth() + 1)) + '-' + util.toSecondNum(date.getDate());
}

/**
 * 将一位小数变为两位
 * @param num 数字
 */
util.toSecondNum = function(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}
export default util;