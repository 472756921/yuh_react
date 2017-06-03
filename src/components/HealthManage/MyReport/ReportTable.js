/**
 * Created by Benson on 2017/4/5.
 */
import React from 'react';
import ReportCircleStyle from '../../../styles/myReport.css';
import {hashHistory} from 'react-router';
import Page from '../../Page/Page';
import {The_risk_assessment,the_health_managements,
  The_docGroup,getAutomationReport,majordignosereport,DownLoadRepot,
  UserGroupType,UserTopThreeList} from '../../../InterFace/InterfaceAPI';

let user;
class ReportTable extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      topTeam: false,
      total:0,
      pageNum:1,
      pageNow:1,
      index:'风险评估报告',
      doc:'123',
      portData:[
        {date:'2013/12/32',name:'风险评估报告'},
        {date:'2013/12/32',name:'健康管理计划'},
        {date:'2013/12/32',name:'月度健康报告'},
        {date:'2013/12/32',name:'季度健康报告'},
        {date:'2013/12/32',name:'年度健康报告'}
      ],
      listData:{
        风险评估报告:[],
        健康管理计划:[],
        月度健康报告:[],
        季度健康报告:[],
        年度健康报告:[]
      }
    }

  };
  componentWillMount(){
    let userinfo = sessionStorage.getItem('userData');
    userinfo = JSON.parse(userinfo);
    user = userinfo;

    $.get(UserGroupType(user.authToken),(rs)=>{
      if(rs.topTeam){
        this.setState({
          ...this.state,
          topTeam:true
        })
      }
    })

  }

  componentDidMount(){
    //获取用户组（主管医生）
    $.get(The_docGroup(user.authToken), (result)=> {
      this.setState({
        ...this.state,
        doc:result.attendingDoctor
      })
    })

    $.get(The_risk_assessment(user.id,1,5,user.authToken), (result)=> {
      this.setState({
        ...this.state,
        pageNum: result.pages,
        total:result.total,
        listData:{
          ...this.state.listData,
          风险评估报告:result.results
        }
      })
    })
  };

  changeNav(text){
    this.setState({
      index:text,
      ...this.state.portData
    })

    switch (text) {
      case '风险评估报告':
        this.getThe_risk_assessment(user,1);
      break;
      case '健康管理计划':
        this.getthe_health_managements(user,1)
      break;
      case '月度健康报告':
        this.getAutomationReport(user,1,1)
      break;
      case '季度健康报告':
        this.getAutomationReport(user,2,1)
      break;
      case '年度健康报告':
        this.getmajordignosereport(user,1)
      break;
    }

  };
  push(data,doc,type,date,id){
    let types=0;
    if(type=='风险评估报告'){
      types=2;
      hashHistory.push({pathname:'/Article/'+types+'/f',state: {data:data,doc:doc}})
    }
    if(type=='健康管理计划'){
      if(this.state.topTeam) {
        types = 9;    //三甲
        hashHistory.push({pathname: '/Article/' + types + '/sj', state: {data: data, id: id,doc:doc}})
      }else{
        types = 3;
        hashHistory.push({pathname: '/Article/' + types + '/h', state: {data: data, doc: doc}})
      }
    }
    if(type=='月度健康报告'){
      types=4;
      hashHistory.push({pathname:'/Article/'+types+'/yj',state: {date:date,id:id}})
    }
    if(type=='季度健康报告'){
      types=12;
      hashHistory.push({pathname:'/Article/'+types+'/j',state: {date:date,id:id}})
    }
    if(type=='年度健康报告'){
      types=5;
      hashHistory.push({pathname:'/Article/'+types+'/y',state: {date:date,id:id}})
    }
  };

  pageChange(pageNow){
    switch (this.state.index) {
      case '风险评估报告':
        this.getThe_risk_assessment(user,pageNow);
        break;
      case '健康管理计划':
        this.getthe_health_managements(user,pageNow)
        break;
      case '月度健康报告':
        this.getAutomationReport(user,1,pageNow)
        break;
      case '季度健康报告':
        this.getAutomationReport(user,2,pageNow)
        break;
      case '年度健康报告':
        this.getmajordignosereport(user,pageNow)
        break;
    }
  }

  getThe_risk_assessment(user,pageNow){
    $.get(The_risk_assessment(user.id, pageNow, 5, user.authToken), (result)=> {
      this.setState({
        ...this.state,
        pageNum: result.pages,
        total:result.total,
        pageNow:pageNow,
        listData: {
          ...this.state.listData,
          风险评估报告: result.results
        }
      })
    })
  }
  getthe_health_managements(user,pageNow){
    if(this.state.topTeam){ //三甲
      $.get(UserTopThreeList(user.id,pageNow,5,user.authToken), (result)=> {
        let list = result.results.map((obj,i)=>{
          return{
            ...obj,
            doc_name:obj.doctorName,
            createTime:obj.updateTime+' '+'00:00:00'
          }
        })
        this.setState({
          ...this.state,
          pageNum: result.pages,
          total:result.total,
          pageNow:pageNow,
          listData:{
            ...this.state.listData,
            健康管理计划:list
          }
        })
      })
    }else{
      $.get(the_health_managements(user.id,pageNow,5,user.authToken), (result)=> {
        let list = result.results.map((obj,i)=>{
          return{
            ...obj,
            doc_name:obj.doctorName,
            createTime:obj.personalHealthManagementTemplateJson.updateTime+' '+'00:00:00'
          }
        })
        this.setState({
          ...this.state,
          pageNum: result.pages,
          pageNow:pageNow,
          total:result.total,
          listData:{
            ...this.state.listData,
            健康管理计划:list
          }
        })
      })
    }

  }
  getAutomationReport(user,type,pageNow){
    //type  1=月度健康报告,2=季度健康报告,
    $.get(getAutomationReport(type,pageNow,5,user.authToken), (result)=> {
      let list = result.results.map((obj,i)=>{
        return{
          ...obj,
          doc_name:'暂无',
          createTime:obj.startTime+' ~ '+obj.endTime
        }
      })
      if(type==1){
        this.setState({
          ...this.state,
          pageNum: result.pages,
          pageNow:pageNow,
          total:result.total,
          listData:{
            ...this.state.listData,
            月度健康报告:list
          }
        })
      }else{
        this.setState({
          ...this.state,
          pageNum: result.pages,
          pageNow:pageNow,
          total:result.total,
          listData:{
            ...this.state.listData,
            季度健康报告:list
          }
        })
      }
    })
  }
  getmajordignosereport(user,pageNow){
    $.get(majordignosereport(user.id,pageNow,5,user.authToken), (result)=> {
      let list = result.results.map((obj,i)=>{
        return{
          ...obj,
          doc_name:'暂无',
        }
      })
      this.setState({
        ...this.state,
        pageNum: result.pages,
        pageNow:pageNow,
        total:result.total,
        listData:{
          ...this.state.listData,
          年度健康报告:list
        }
      })
    })
  }

  DownLoadRepot(id,type){
    let url;
    if(type=='风险评估报告'){
      url='riskAssessment';
    }else if(type=='健康管理计划'){
      url='personalHealthManagement';
      if(this.state.topTeam){
        alert('该类报告暂时不能提供下载，敬请谅解');
        return;
      }
    }else{
      alert('该类报告暂时不能提供下载，敬请谅解');
      return;
    }

    var oReq = new XMLHttpRequest();
    oReq.open("GET", "http://115.28.173.39:8080/app/api/report/"+url+"?id="+id, true);
    oReq.responseType = "blob";
    oReq.setRequestHeader('authToken',user.authToken)
    oReq.onload = function(oEvent) {
      let blob = new Blob([oReq.response], {type: 'application/octet-stream;charset=UTF-8'});
      saveAs(blob, decodeURI('报告文件.docx'));
    }.bind(this);
    oReq.send();
  }

  checkEG(){
    if(this.state.index!='年度健康报告'){
      return
    }
    hashHistory.push({pathname:'/Article/eg/about'})

  }

  render(){
    let table = this.state.portData.map((data,i)=>{
      return (
        <li key={i} role="presentation" className={[ReportCircleStyle.togglable_title,this.state.index==data.name?ReportCircleStyle.report_togglable_title_active:''].join(' ')}>
          <a href={'#'+data.name} aria-controls="profile" role="tab" data-toggle="tab" onClick={()=>this.changeNav(data.name)}>{data.name}</a>
        </li>
      )
    })
    let list = <li style={{fontSize:'20px',color:'red',cursor:'auto'}}><span>暂无报告</span>{this.state.index=='年度健康报告'?<span style={{color:'#999',cursor:'pointer'}} onClick={()=>this.checkEG()}>查看示例</span>:''}<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></li>;
    this.state.portData.map((data,i)=>{
      if(this.state.index==data.name){
        if( this.state.listData[data.name].length>0)
        list = this.state.listData[data.name].map((obj,j)=>{
          return (
            <li key={j}>
              <div>
                <div className={[ReportCircleStyle.report_C_lists_date,'pull-left',!obj.checked?ReportCircleStyle.report_C_lists_date_noRead:''].join(" ")}>
                  <h3>{obj.createTime.split(' ')[0].split('-')[2]}</h3>
                  <h5>{obj.createTime.split(' ')[0].split('-')[0]}/{obj.createTime.split(' ')[0].split('-')[1]}</h5>
                </div>
                <div className="pull-right">
                  <div className={ReportCircleStyle.report_C_lists_title} onClick={()=>this.push(obj,this.state.doc,data.name,obj.createTime,obj.id)}>{data.name}</div>
                  <div className={ReportCircleStyle.redText}>{!obj.checked?'未读':'已读'}</div>
                </div>
              </div>
              <div>录入人: {obj.doc_name} </div>
              <div>{obj.createTime}</div>
              <div data={obj.id}>
                <a onClick={()=>this.DownLoadRepot(data.name=='健康管理计划'&&!this.state.topTeam?obj.personalHealthManagementTemplateJson.id:obj.id,data.name)} style={{cursor:'pointer'}}>下载报告</a>
              </div>
            </li>
          )
        })
      }
    })

    let page = <Page data={{pageNum:this.state.pageNum,total:this.state.total,pageNow:this.state.pageNow}}  pageChange={(pageNow)=>this.pageChange(pageNow)}/>;

    return (
      <div className={ReportCircleStyle.report_C}>
        <div className={ReportCircleStyle.report_C_content}>
          <div className={ReportCircleStyle.togglable}>
            <ul className={['nav','nav-tabs',ReportCircleStyle.report_C_user_line].join(" ")} role="tablist">
              {table}
            </ul>
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active">
                <ul className={ReportCircleStyle.report_C_lists}>
                  {list}
                </ul>
              </div>
              {page}
              <div style={{clear:'both'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReportTable;
