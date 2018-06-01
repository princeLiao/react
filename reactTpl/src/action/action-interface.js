let env = "dev";
if (/weidai.com.cn/.test(location.origin)) { //生产环境
    env = "prod";
}
let daibao, feStatic, ptsentry, admin, weipay, activity,hr;
switch (env) {
    case "prod":
        hr='//venus-hr.weidai.com.cn';
        break;
    case "dev":
        hr='//venus-hr.wdai.com/api/';
        feStatic = '//static1.wdai.com/';
        activity = '//activity.wdai.com/';
        break;
}

let action = {};
//后台管理接口
action.debug = env;
action.admin = {
    modules: admin + 'mallmodule/allList',
    banner: admin + 'mallbanner/list',
    activity: admin + 'mallactivity/list'
};

//外部链接
action.links = {

};
//接口地址

action.interface = {
    interviewList:hr+'v1/h5/interview/list' //列出申请人面试信息
    ,login:hr+'v1/h5/login' //登录
    ,isLogin:hr+'v1/h5/login/is-login-before' //是否登录过
    ,smsCode:hr+'v1/h5/login/send-sms-code' //验证码
    ,unDoList:hr+'v1/h5/record/list-un-fill-in' //获取未填写信息列表
    ,updateUserInfo:hr+'v1/h5/applicant/update' //更新个人情况
    ,getUserInfo:hr+'v1/h5/applicant/get' //获取个人情况
    ,addContact:hr+'v1/h5/contacts/add' //添加紧急联系人
    ,updateContact:hr+'v1/h5/contacts/add' //更新紧急联系人
    ,getContact:hr+'v1/h5/contacts/list' //获取紧急联系人
    ,addEdu:hr+'v1/h5/education/add' //添加教育经历
    ,updateEdu:hr+'v1/h5/education/add' //更新教育经历
    ,getEdu:hr+'v1/h5/education/list' //获取教育经历
    ,addExperience:hr+'v1/h5/experience/add' //添加工作经历
    ,updateExperience:hr+'v1/h5/experience/add' //更新工作经历
    ,getExperience:hr+'v1/h5/experience/list' //获取工作经历
    ,getEntry:hr+'v1/h5/on-board/get' //获取入职资料
    ,addEntry:hr+'v1/h5/on-board/add'
    ,file:hr+'v1/h5/file/upload'
    ,addFamily:hr+'v1/h5/family/add' //添加家庭联系人
    ,getFamily:hr+'v1/h5/family/list' //获取家庭联系人
    ,addOther:hr+'v1/h5/others/add' //添加其他情况
    ,getOther:hr+'v1/h5/others/get' //添加其他情况
    
    
    
    

};

action.activity = {
    getShareCfg: daibao + '/jsapi',
    // getShareCfg:activity + "share/getShareCfg.json"
};


export default action;