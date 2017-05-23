/**
 * Created by Benson on 2017/4/5.
 */
import React from 'react';
import ReportCircleStyle from '../../../styles/myReport.css';
import {The_risk_assessment,the_health_managements,The_docGroup,getAutomationReport,majordignosereport,UserGroupType,UserTopThreeList} from '../../../InterFace/InterfaceAPI';
import Promise from 'promise';
import {hashHistory} from 'react-router';

let UsertopTeam=false;
class ReportCircle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      topTeam:false,
      portData:[]
    }
  }

  checkUserType(){
    if(this.state.topTeam){
      return UserTopThreeList
    }else{
      return the_health_managements
    }
  }
  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(UserGroupType(user.authToken),(rs)=>{
      if(rs.topTeam){
        this.setState({
          ...this.state,
          topTeam:true
        })
        UsertopTeam = true;
      }
    })
  }
  componentDidMount (){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);

      $.get(The_risk_assessment(user.id,1,1,user.authToken), (result)=> {
        if(result.results.length!=0)
          this.setState({
            ...this.state,
            portData:[
              {...result.results[0],date:result.results[0].createTime,name:'风险评估报告',state:result.results[0].checked?1:2,createTime:result.results[0].createTime},
            ],
          })
        else
          this.setState({
            ...this.state,
            portData:[
              ...this.state.portData,
              {date:'暂无',name:'风险评估报告',state:0},
            ],
          })

        $.get(this.checkUserType()(user.id,1,1,user.authToken), (result)=> {
          if(result.results.length!=0) {
            if (UsertopTeam) {
              this.setState({
                ...this.state,
                portData: [
                  ...this.state.portData,
                  {
                    ...result.results[0],
                    date: result.results[0].updateTime,
                    name: '健康管理计划',
                    state: result.results[0].checked ? 1 : 2,
                    createTime: result.results[0].updateTime
                  },
                ],
              })
            } else {
              this.setState({
                ...this.state,
                portData: [
                  ...this.state.portData,
                  {
                    ...result.results[0],
                    date: result.results[0].personalHealthManagementTemplateJson.updateTime,
                    name: '健康管理计划',
                    state: result.results[0].checked ? 1 : 2,
                    createTime: result.results[0].personalHealthManagementTemplateJson.updateTime
                  },
                ],
              })
            }
          } else
            this.setState({
              ...this.state,
              portData:[
                ...this.state.portData,
                {date:'暂无',name:'健康管理计划',state:0},
              ],
            })

          $.get(getAutomationReport(1,1,1,user.authToken), (result)=> {
            if(result.results.length!=0)
              this.setState({
                ...this.state,
                portData:[
                  ...this.state.portData,
                  {...result.results[0],date:result.results[0].startTime,name:'月度健康报告',state:result.results[0].checked?1:2,createTime:result.results[0].startTime+' ~ '+result.results[0].endTime},
                ],
              })
            else
              this.setState({
                ...this.state,
                portData:[
                  ...this.state.portData,
                  {date:'暂无',name:'月度健康报告',state:0},
                ],
              })
            $.get(getAutomationReport(2,1,1,user.authToken), (result)=> {
              if(result.results.length!=0)
                this.setState({
                  ...this.state,
                  portData:[
                    ...this.state.portData,
                    {...result.results[0],date:result.results[0].startTime,name:'季度健康报告',state:result.results[0].checked?1:2,createTime:result.results[0].startTime+' ~ '+result.results[0].endTime},
                  ],
                })
              else
                this.setState({
                  ...this.state,
                  portData:[
                    ...this.state.portData,
                    {date:'暂无',name:'季度健康报告',state:0},
                  ],
                })
              $.get(majordignosereport(user.id,1,1,user.authToken), (result)=>{
                if(result.results.length!=0)
                  this.setState({
                    ...this.state,
                    portData:[
                      ...this.state.portData,
                      {...result.results[0],date:result.results[0].createTime,name:'年度健康报告',state:result.results[0].checked?1:2,createTime:result.results[0].createTime},
                    ],
                  })
                else
                  this.setState({
                    ...this.state,
                    portData:[
                      ...this.state.portData,
                      {date:'暂无',name:'年度健康报告',state:0},
                    ],
                  })
              })
            })
          })
        })
      });

    $.get(The_docGroup(user.authToken), (result)=> {
      this.setState({
        ...this.state,
        doc:result.attendingDoctor
      })
    })
  };
  push(data,doc,type,date,id){
    if(date==undefined){
      return
    }
    let types=0;
    if(type=='风险评估报告'){
      types=2;
      hashHistory.push({pathname:'/Article/'+types+'/23',state: {data:data,doc:doc}})
    }
    if(type=='健康管理计划'){
      if(UsertopTeam){
        types=9   //三甲
        hashHistory.push({pathname:'/Article/'+types+'/sj',state: {data:data,id:id,doc:doc}})
      }else{
        types=3;
        hashHistory.push({pathname:'/Article/'+types+'/23',state: {data:data,doc:doc}})
      }
    }
    if(type=='月度健康报告'||type=='季度健康报告'){
      types=4;
      hashHistory.push({pathname:'/Article/'+types+'/23',state: {date:date,id:id}})
    }
    if(type=='年度健康报告'){
      types=5;
      hashHistory.push({pathname:'/Article/'+types+'/23',state: {date:date,id:id}})
    }
  };
  render(){
    let c = this.state.portData.map((data,i)=>{
      let classNames = [ReportCircleStyle.report_circle];
      if(data.state==2){
        classNames = [ReportCircleStyle.report_circle,ReportCircleStyle.noRead].join(' ');
      }else if(data.state==0){
        classNames = [ReportCircleStyle.report_circle,ReportCircleStyle.noExist].join(' ');
      }
      return (
        <div className={ReportCircleStyle.report_btn} key={i}>
          <div className={classNames} onClick={()=>this.push(data,this.state.doc,data.name,data.createTime,data.id)}>
            <h2>{data.date.split(' ')[0].split('-')[2]}</h2>
            <h4>{data.date.split(' ')[0].split('-')[0]}{data.date!='暂无'?'/':''}{data.date.split(' ')[0].split('-')[1]}</h4>
          </div>
          <h4 className={ReportCircleStyle.report_title}>{data.name}</h4>
        </div>
      )
    })

    return (
      <div className={ReportCircleStyle.report_A}>
        <div className={ReportCircleStyle.report_A_content}>
          {c}
        </div>
      </div>
    )
  }
}
export  default ReportCircle;
