/**
 * Created by Benson on 2017/3/31.
 */


const _API = 'http://115.28.173.39/';

//文章列表接口
export const ARTICLE = function (type,page,pageSize){
  const httpAPI = _API+'app/api/common/articles?type='+type+'&page='+page+'&pageSize='+pageSize;
  return httpAPI;
}
//文章详情
export const ARTICLEDETAILS = function (id){
  const httpAPI = _API+'app/api/common/article/'+id;
  return httpAPI;
}
//获取用户组（主管医生）
export const The_docGroup = function(authToken){
  const httpAPI = _API+'app/api/topThreeService/get/groupType';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//风险评估（列表+正文）
export const The_risk_assessment = function(customerid,page,pageSize,authToken){
  const httpAPI = _API+'app/api/account/riskreport/infos?customerid='+customerid+'&iscustomer=true&page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//健康管理计划评估（列表+正文）
export const the_health_managements = function(customerid,page,pageSize,authToken){
  const httpAPI = _API+'app/api/account/getHealthManagements?customerId='+customerid+'&page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  },};
}
//月、季度报告（列表） type=1 月度 =2季度
export const getAutomationReport = function(type,page,pageSize,authToken){
  const httpAPI = _API+'app/api/account/getAutomationReport?type='+type+'&page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  },};
}
//月季详情
export const getAutomationReportDatil = function(end,start,authToken){
  const httpAPI = _API+'app/api/account/get/pic/sumReport?endDate='+end+'&startDate='+start;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  },};
}
//年度报告（列表)
export const majordignosereport = function(customerid,page,pageSize,authToken){
  const httpAPI = _API+'app/api/account/majordignosereport/infos?customerid='+customerid+'&page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  },};
}
//年度报告（详情)
export const majordignosereportDatil = function(customerid,id,authToken){
  const httpAPI = _API+'app/api/doctor/health/info/dailyinfo/data/'+customerid+'?cusid='+customerid+'&repId='+id;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//下载报告
export const DownLoadRepot = function(id,authToken){
  const httpAPI = _API+'app/api/report/riskAssessment?id='+id;
  return {url:httpAPI,type:'GET',contentType:'application/octet-stream; charset=utf-8',headers: {
    "authToken":authToken
  }};
}


//用户数据查询（血压，血糖。。。）
export const UserData = function(dataType,endTime,startTime,page,pageSize,authToken){
  const httpAPI = _API+'app/api/account/health/check/infos?dataType='+dataType+'&endDate='+endTime+'&page='+page+'&pageSize='+pageSize+'&startDate='+startTime;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  },};
}
//用户数据图标查询（血压，血糖。。。）
export const UserDataImg = function(dataType,endTime,startTime,authToken){
  const httpAPI = _API+'app/api/account/health/report?endDate='+endTime+'&startDate='+startTime+'&type='+dataType;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//数据预览
export const UserHelDate = function (){
  const httpAPI = _API+'app/api/account/conversion/health/check/infos';
  return httpAPI;
}
//数据提交
export const UserHelDatePost = function (){
  const httpAPI = _API+'app/api/account/health/check/infos';
  return httpAPI;
}
//健管师提问列表所有
export const ASKMList = function(page,pageSize,authToken){
  const httpAPI = _API+'app/api/common/health/advices?page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//健管师提问列表我的
export const ASKMListMy = function(page,pageSize,authToken){
  const httpAPI = _API+'app/api/account/health/advices?page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//健管师提问详情
export const ASKMDatile = function(page,pageSize,id,authToken){
  const httpAPI = _API+'app/api/consult/health/advice/'+id+'/replies?page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//健管师提问详情，用户回复
export const ASKMDatileUserInput = function(authToken){
  const httpAPI = _API+'app/api/consult/advice/reply';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  },error(rs){alert(rs.responseJSON.message)}};
}



//健管师提交问题
export const ASKMPost = function(authToken){
  const httpAPI = _API+'app/api/consult/advice';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}


//医生提问列表
export const ASKDOCList = function(page,pageSize,authToken){
  const httpAPI = _API+'app/api/account/health/consults?page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}

//医生提交问题
export const ASKDOCPost = function(authToken){
  const httpAPI = _API+'app/api/account/health/consult';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  },error(a,b,c){alert(a.responseJSON.message)}};
}
//医生提问详情
export const ASKDOCDatile = function(id,authToken){
  const httpAPI = _API+'app/api/account/health/consult/'+id
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//评价医生咨询
export const ASKDOCcommentPost = function(id,authToken){
  const httpAPI = _API+'app/api/account/health/consult/'+id+'/comment';
  return {url:httpAPI,contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}
//问医生列表中的团队
export const ASKDOCGetGroup = function(authToken){
  const httpAPI = _API+'app/api/account/health/groups';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}

//剩余询问次数
export const ASKTIME = function(authToken){
  const httpAPI = _API+'app/api/servicePackage/getCustomerServiceDetail';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}

//健康团队列表
export const HealthTeamList = function(page,pageSize,authToken){
  const httpAPI = _API+'app/api/account/query/health/groups?page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//健康团队详情-A 团队
export const HealthTeamGroup = function(id){
  const httpAPI = _API+'app/api/common/health/group/'+id;
  return {url:httpAPI,type:'GET'};
}
//健康团队详情-B 医生
export const HealthTeamDoc = function(id){
  const httpAPI = _API+'app/api/common/health/group/'+id+'/doctors';
  return {url:httpAPI,type:'GET'};
}
//查询医生详情
export const DocDatile = function(id){
  const httpAPI = _API+'app/api/common/doctor/'+id;
  return {url:httpAPI,type:'GET'};
}
//查询医生评价
export const DocDatileComments = function(id){
  const httpAPI = _API+'app/api/common/doctor/'+id+'/comments';
  return {url:httpAPI,type:'GET'};
}

//获取省份
export const GetProvinces = function(){
  const httpAPI = _API+'app/api/common/provinces';
  return {url:httpAPI,type:'GET'};
}
//获取城市
export const GetCity = function(proID){
  const httpAPI = _API+'app/api/common/cities/province/'+proID;
  return {url:httpAPI,type:'GET'};
}

//个人中心 个人信息
export const GETUserData = function(authToken){
  const httpAPI = _API+'app/api/account/get/customer/data';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//个人中心 提交个人信息
export const POSTUserData = function(authToken){
  const httpAPI = _API+'app/api/account/update/customer/data';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}
//个人中心 基本数据
export const GETUserBaseData = function(authToken){
  const httpAPI = _API+'app/api/account/get/customer/basic';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//个人中心 提交基本数据
export const POSTUserBaseData = function(authToken){
  const httpAPI = _API+'app/api/account/update/customer/basic';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}
//个人中心 既往病史
export const GETUserHistory = function(authToken){
  const httpAPI = _API+'app/api/account/get/customer/history';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//个人中心 提交既往病史
export const POSTUserHistory = function(authToken){
  const httpAPI = _API+'app/api/account/update/customer/history';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}
//个人中心 删除既往病史记录
export const DelUserHistory = function(id,authToken){
  const httpAPI = _API+'app/api/common/delete/info?id='+id+'&type=1';
  return {url:httpAPI,type:'GET',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}


//个人中心 药物
export const GETUserSituation = function(authToken){
  const httpAPI = _API+'app/api/account/get/customer/drug';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//个人中心 药物删除
export const DelUserSituation = function(id,authToken){
  const httpAPI = _API+'app/api/common/delete/info?id='+id+'&type=0';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//个人中心 药物列表  1药物名 2化学名
export const Getmedicine = function(type){
  const httpAPI = _API+'app/api/common/Medicine/names?type='+type;
  return {url:httpAPI,type:'GET'};
}
//个人中心 药物列表根据名称获取
export const GetmedicineByName = function(name){
  const httpAPI = _API+'app/api/common/Medicine/names?type=1&chemicalName='+name;
  return {url:httpAPI,type:'GET'};
}
//个人中心 药物化学名根据名称获取
export const GetmedicineHuaXueByName= function(name){
  const httpAPI = _API+'app/api/common/Medicine/names?type=2&name='+name;
  return {url:httpAPI,type:'GET'};
}
//个人中心 药物提交
export const PostUserSituation = function(authToken){
  const httpAPI = _API+'app/api/account/update/customer/drug';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}

//个人中心 医疗事件
export const GETUserEvent = function(authToken){
  const httpAPI = _API+'app/api/account/get/customer/event';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//个人中心 医疗事件修改
export const PostUserEvent = function(authToken){
  const httpAPI = _API+'app/api/account/update/customer/event';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}
//修改密码
export const changePWD = function(){
  const httpAPI = _API+'app/api/account/setting/password';
  return httpAPI
}

//个人中心 消息列表  type=1消息 =2公告
export const Getmessages = function(page,pageSize,type,authToken){
  const httpAPI = _API+'app/api/account/messages?isGuardian=false&page='+page+'&pageSize='+pageSize+'&type='+type;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
export const GetmessagesByID = function(id,authToken,type){
  const httpAPI = _API+'app/api/account/message/'+id+'/type/'+type;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
// 标记已读
export const redmessages = function(authToken){
  const httpAPI = _API+'app/api/account/message/operate';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}

export const LoginAPI = function(){
  const httpAPI = _API+'app/api/account/login';
  return httpAPI;
}

//未使用
export const LoginAPIYZM = function(){
  const httpAPI = _API+'captcha';
  return {url:httpAPI,type:'GET'};
}

export const LoginOutAPI = function(authToken){
  const httpAPI = _API+'app/api/account/logout';
  return {url:httpAPI,type:'POST',headers: {
    "authToken":authToken
  }};
}
export const fogetPWD = function(name,idNum){
  const httpAPI = _API+'app/api/common/getCustomerQuestion?idCardNumber='+idNum+'&username='+name;
  return {url:httpAPI,type:'GET'};
}
export const getCustomerSafeAnswer = function(id,safeAnswer){
  const httpAPI = _API+'app/api/common/getCustomerSafeAnswer?id='+id+'&safeAnswer='+safeAnswer;
  return {url:httpAPI,type:'GET'};
}
export const getCustomerPassword = function(id,password){
  const httpAPI = _API+'app/api/common/getCustomerPassword?id='+id+'&password='+password;
  return {url:httpAPI,type:'GET'};
}

//未使用
export const protocol = function(){
  const httpAPI = _API+'app/api/common/protocol';
  return {url:httpAPI,type:'GET'};
}


//获取未读消息 (type 2通知、互动总数 1日程 3问医生 8问健康管理师) head使用
export const getMessagesNoRead = (authToken,type)=>{
  const httpAPI = _API+'app/api/account/statistics/'+type;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  },error(){ sessionStorage.clear('userData');localStorage.clear();}};
}
//获取未读消息（type   1消息  2公告）
export const getMesNoRead = (authToken,type)=>{
  const httpAPI = _API+'app/api/account/message/new/count?type='+type;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}

//获取事件
export const GETDateEvent = (authToken,endDate,startDate)=>{
  const httpAPI = _API+'app/api/schedule/month?endDate='+endDate+'&startDate='+startDate;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//获取事件详情
export const GETDateEventDatile = (authToken,Date)=>{
  const httpAPI = _API+'app/api/schedule/day?date='+Date;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//修改日程
export const EditDateEvent = (authToken)=>{
  const httpAPI = _API+'app/api/schedule/edit';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}
//新建日程
export const NewDateEvent = (authToken)=>{
  const httpAPI = _API+'app/api/account/schedule';
  return {url:httpAPI,type:'POST',contentType : 'application/json',headers: {
    "authToken":authToken
  }};
}
//删除日程时间
export const DelDateEvent = (authToken,id)=>{
  const httpAPI = _API+'app/api/schedule/'+id;
  return {url:httpAPI,type:'DELETE',headers: {
    "authToken":authToken
  }};
}


//用户身份判断  （三甲，脑卒中）
export const UserGroupType = (authToken)=>{
  const httpAPI = _API+'app/api/topThreeService/get/groupType';
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//三甲用户个人方案列表
export const UserTopThreeList = (userID,page,pageSize,authToken)=>{
  const httpAPI = _API+'app/api/account/getTopThreeHealthManagemenList?customerId='+userID+'&page='+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//三甲用户个人方案详情
export const UserTopThreeDatile = (ID,authToken)=>{
  const httpAPI = _API+'app/api/doctor/getTopThreeHealthManagement/'+ID;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//三甲用户随访列表
export const UserTopThreeFUList = (page,authToken)=>{
  const httpAPI = _API+'app/api/topThreeService/get/topThreeServices?page='+page;
  return {url:httpAPI,type:'GET',headers: {
    "authToken":authToken
  }};
}
//获取我的服务列表
export const GetService = (type,authToken)=>{
  const httpAPI = _API+'app/api/account/getMyService/'+type;
  return {url:httpAPI,type:'GET',async:false,headers: {
    "authToken":authToken
  }};
}
//卒中随访列表
export const CerebralSList = (customerId,page,pageSize,authToken)=>{
  const httpAPI = _API+'app/api/strokeFollowUp/getStrokes?customerId='+customerId+"&page="+page+'&pageSize='+pageSize;
  return {url:httpAPI,type:'GET',async:false,headers: {
    "authToken":authToken
  }};
}
//卒中随访详情
export const CerebralSDatile = (strokeFollowUpId,authToken)=>{
  const httpAPI = _API+'app/api/strokeFollowUp/getRecords?strokeFollowUpId='+strokeFollowUpId;
  return {url:httpAPI,type:'GET',async:false,headers: {
    "authToken":authToken
  }};
}

//标记报告已读
export const sendRead = (type,id,authToken)=>{
  const httpAPI = _API+'app/api/account/update/'+type+'/report/'+id;
  return {url:httpAPI,type:'post',async:false,headers: {
    "authToken":authToken
  }};
}

//用户注册-检测用户名是否重复
export const registerCheckUserName = (userName)=>{
  const httpAPI = _API+'app/api/common/check/name/used?type=1&name='+userName;
  return {url:httpAPI,type:'get',async:false};
}

//用户注册-检测身份证是否重复
export const registerCheckregisterCheckUserName = (idCardNumber)=>{
  const httpAPI = _API+'app/api/common/check/idcard/used?idCardNumber='+idCardNumber;
  return {url:httpAPI,type:'get',async:true};
}

//用户注册-城市机构查询
export const registerCheckreGroup = (city,pr,page)=>{
  const httpAPI = _API+'app/api/common/health/findgroups?cityId='+city+'&page='+page+'&provinceId='+pr;
  return {url:httpAPI,type:'get',async:false};
}
//用户注册-提交信息
export const register= ()=>{
  const httpAPI = _API+'app/api/account/register';
  return {url:httpAPI,type:'post',contentType:'application/json'};
}

//问医生，补充资料
export const buchongtijiao= (id,authToken)=>{
  const httpAPI = _API+'app/api/account/health/consult/'+id;
  return {url:httpAPI,type:'post',contentType:'application/json',headers: {
    "authToken":authToken
  }};
}

//nmmp
export const chakannmmp= (id,authToken)=>{
  const httpAPI = _API+'app/api/account/health/check/info/'+id;
  return {url:httpAPI,type:'get',contentType:'application/json',headers: {
    "authToken":authToken
  }};
}
