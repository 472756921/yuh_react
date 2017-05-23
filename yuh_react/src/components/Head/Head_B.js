/**
 * Created by Benson on 2017/3/30.
 */
import React from 'react';
import HeadStyle from '../../styles/header.css';
import {Link,hashHistory} from 'react-router';
import {UserGroupType,getMessagesNoRead} from '../../InterFace/InterfaceAPI';

class appHead_B extends React.Component {
  constructor(props) {
    super(props);
    let index = hashHistory.getCurrentLocation().pathname.split('/')[1];
    switch (index){
      case '':
        index='首页';
        break;
      case 'HealthManage':
        index='健康管理';
        break;
      case 'ConsultingMain':
        index='健康咨询';
        break;
      case 'HealthTeam':
        index='健康团队';
        break;
      case 'Personal':
        index='个人中心';
        break;
      case 'Article':

        break;
      default:
        index='首页'
        break;
    }
    this.state={
      dateEvent:0,
      askM:0,
      askD:0,
      topTeam:false,
      strokeFollowUp:false,
      index:index,
      nav:[
        {text:'首页',  href:'#', las:[]},
        {text:'健康管理', index:false,
          las:[
            {text:'我的服务', href:'#/HealthManage/MyService'},
            {text:'我的报告', href:'#/HealthManage/MyReport'},
            {text:'我的数据', href:'#/HealthManage/MyData'},
            {text:'我的日程', href:'#/HealthManage/MySchedule'},
            {text:'三甲随访', href:'#/Article/10/1'},
            {text:'脑卒中随访', href:'#/HealthManage/CerebralStrokeMain'}
          ]
        },
        {text:'健康咨询', index:false,
          las:[{text:'问健管师', href:'#/ConsultingMain/HMD'}, {text:'问医生', href:'#/ConsultingMain/HMDUC'}]
        },
        {text:'健康团队', href:'#/HealthTeam/Teams', las:[],index:false},
        {text:'个人中心', href:'#/Personal/data', las:[],index:false},
      ]
    }
  }

  navActive(text){
    this.setState({
      index:text,
      ...this.state
    })
  }

  componentWillMount(){
    let userinfo = sessionStorage.getItem('userData');
    userinfo = JSON.parse(userinfo);
    if(userinfo!=null&&userinfo!=undefined) {
      $.get(UserGroupType(userinfo.authToken), (rs)=> {
        if (rs.topTeam) {
          this.setState({
            ...this.state,
            topTeam: true
          })
        }
        if (rs.strokeFollowUp) {
          this.setState({
            ...this.state,
            strokeFollowUp: true
          })
        }
      })
      $.get(getMessagesNoRead(userinfo.authToken,1),(rs)=>{
        $.get(getMessagesNoRead(userinfo.authToken,3),(rsD)=>{
          $.get(getMessagesNoRead(userinfo.authToken,8),(rsM)=>{
            this.setState({
              dateEvent:rs.total,
              askD: rsD.total,
              askM: rsM.total,
            })
          })
        })
      })
    }
  }

  render() {
    let navLi = this.state.nav.map((navObj,i)=>{
        return (
          <li key={i}>
            {navObj.las.length!=0?
              <span style={{cursor:'pointer'}}>
                {navObj.text}
                {navObj.text=='健康管理'&&this.state.dateEvent!=0?<span className={HeadStyle.badge_user2}>{this.state.dateEvent}</span>:''}
                {navObj.text=='健康咨询'&&(this.state.askD!=0||this.state.askM!=0)?<span className={HeadStyle.badge_user2}>{this.state.askD+this.state.askM}</span>:''}
              </span>
              :
              <a href={navObj.href} style={{color:'#333'}} onClick={()=>this.navActive(navObj.text)}>{navObj.text}</a>
            }
            <ul className={HeadStyle.user_menu}>
            {
              navObj.las.map((nlas,i)=>{
                if(nlas.text=='三甲随访'){
                  if(!this.state.topTeam)
                  return
                }
                if(nlas.text=='脑卒中随访'){
                  if(!this.state.strokeFollowUp)
                  return
                }
                if(nlas.text=='我的日程'){
                  if(this.state.dateEvent!=0){
                    return (
                      <li  key={i}><a href={nlas.href} style={{color:'#333'}} onClick={()=>this.navActive(navObj.text)}>{nlas.text}</a><span className={HeadStyle.badge_user2} style={{top:'263px'}}>{this.state.dateEvent}</span></li>
                    )
                  }else {
                    return (
                      <li  key={i}><a href={nlas.href} style={{color:'#333'}} onClick={()=>this.navActive(navObj.text)}>{nlas.text}</a></li>
                    )
                  }
                }else if(nlas.text=='问健管师'){
                  if(this.state.askM!=0){
                    return (
                      <li  key={i}><a href={nlas.href} style={{color:'#333'}} onClick={()=>this.navActive(navObj.text)}>{nlas.text}</a><span className={HeadStyle.badge_user2} style={{top:'110px'}}>{this.state.askM}</span></li>
                    )
                  }else {
                    return (
                      <li  key={i}><a href={nlas.href} style={{color:'#333'}} onClick={()=>this.navActive(navObj.text)}>{nlas.text}</a></li>
                    )
                  }
                }else if(nlas.text=='问医生'){
                  if(this.state.askD!=0){
                    return (
                      <li  key={i}><a href={nlas.href} style={{color:'#333'}} onClick={()=>this.navActive(navObj.text)}>{nlas.text}</a><span className={HeadStyle.badge_user2} style={{top:'160px'}}>{this.state.askD}</span></li>
                    )
                  }else {
                    return (
                      <li  key={i}><a href={nlas.href} style={{color:'#333'}} onClick={()=>this.navActive(navObj.text)}>{nlas.text}</a></li>
                    )
                  }
                }else{
                  return (
                    <li  key={i}><a href={nlas.href} style={{color:'#333'}} onClick={()=>this.navActive(navObj.text)}>{nlas.text}</a></li>
                  )
                }
              })
            }
            </ul>
            {navObj.las.length!=0?
              <span>
                <div className={HeadStyle.triangleDown}></div>
                <div className={this.state.index==navObj.text?[HeadStyle.triangleUp,HeadStyle.triangle_up_active].join(" "):''}></div>
              </span>
              :
              <span>
                <div className={this.state.index==navObj.text?HeadStyle.triangleUp:''}></div>
                <div className={[HeadStyle.triangleUp,HeadStyle.te].join(" ")}></div>
              </span>
            }
          </li>
        )
    })

    return (
      <div className={HeadStyle.bbd}>
        <div className={HeadStyle.headerBottom}>
          <div className={HeadStyle.headerBottomContent}>
            <img src={require('images/icon/logo.png')}  onClick={()=>{hashHistory.push({pathname:'/'})}}  alt="优医汇LOGO"/>
            <ul>
              {navLi}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default appHead_B;
