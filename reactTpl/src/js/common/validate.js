class validate {
    /**
     * 校验值类，比如手机号码、身份证之类的
     */
    constructor(){

    }
    /**
     * 校验身份证号码
     * @param {*} value 校验值
     */
    static idCard(value){
        if (value != '' && value != undefined) {
            if (value.length < 18) {
                return false;
            } else if (value.length == 18) {
                if (checkIdcard(value) != 0) {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    /**
     * 校验手机号码
     * @param {*} value 校验值
     */
    static mobile(value){
        value?value=value.replace(/\s/g, ""):value="";
        if (value != '' && value != undefined) {
            return /^(13|15|18|17|14)\d{9}$/i.test(value); 
        } else {
            return false;
        }
    }

    /**
     * 校验电话号码
     * @param {*} value 校验值
     */
    static phone(value){
        if (value != '' && value != undefined) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);  
        } else {
            return false;
        }
    }

    /**
     * 校验用户姓名
     * @param {*} value 校验值
     */
    static userName(value){
        if (value != '' && value != undefined) {
            return /^[\u0391-\uFFE5]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value);
        } else {
            return true;
        } 
    }

    /**
     * 校验车牌号
     * @param {*} value 校验值
     */
    static carNo(value){
        if (value != '' && value != undefined) {
            return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(value);
        } else {
            return false;
        }
    }
    /**
     * 邮箱
     */
    static email(value){
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
        if (value != '' && value != undefined) {
            return reg.test(value);
        } else {
            return false;
        }
    }
};

/**
 * 身份证号码校验
 */
function checkIdcard(idcard) {
	
	let area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江", 31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北", 43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏", 61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
	
	let Y,JYM;
	let S,M;
	let idcard_array = [];
	idcard_array = idcard.split("");
	//地区检验
	if(area[parseInt(idcard.substr(0,2))]==null) return 4;
    //身份号码位数及格式检验
	switch(idcard.length){
		case 18:
			//18位身份号码检测
			//出生日期的合法性检查 
			//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            let ereg;
			if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
				 ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
			} else {
				 ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
            }
			if(ereg.test(idcard)){//测试出生日期的合法性
					//计算校验位
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
					+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
					+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
					+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
					+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
					+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
					+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
					+ parseInt(idcard_array[7]) * 1 
					+ parseInt(idcard_array[8]) * 6
					+ parseInt(idcard_array[9]) * 3 ;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y,1);//判断校验位
				//支持X大小写	
				if(M == idcard_array[17].toUpperCase()) return 0; //检测ID的校验位
				else return 3;
			}else return 2;
			break;
		default:
			return 1;
		break;
	}
}

export default validate;