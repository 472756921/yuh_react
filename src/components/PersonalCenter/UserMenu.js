/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react'
import PersonalMenuStyle from '../../styles/PersonalMenu.css';
import {hashHistory} from "react-router";
import {getMesNoRead} from '../../InterFace/InterfaceAPI';

class UserMenu extends React.Component{

  constructor(props){
    super(props);
    let indexA = hashHistory.getCurrentLocation().pathname.split('/')[1];
    let indexB = hashHistory.getCurrentLocation().pathname.split('/')[2];
    this.state={
      activeMenu:'/'+indexA+'/'+indexB,
      message:'',
      adm:'',
      user:[
        {
          name:'个人资料',
          url:'/Personal/data',
          imgSrc:require('images/ICON/menu/personalData_grey.png'),
          imgSrc2:require('images/ICON/menu/personalData_red.png'),
        },
        {
          name:'基本数据',
          url:'/Personal/baseData',
          imgSrc:require('images/ICON/menu/basicData_grey.png'),
          imgSrc2:require('images/ICON/menu/basicData_red.png'),
        },
        {
          name:'既往病史',
          url:'/Personal/medicalHistory',
          imgSrc:require('images/ICON/menu/medicalHistory_grey.png'),
          imgSrc2:require('images/ICON/menu/medicalHistory_red.png'),
        },
        {
          name:'药物情况',
          url:'/Personal/drugSituation',
          imgSrc:require('images/ICON/menu/drugSituation_grey.png'),
          imgSrc2:require('images/ICON/menu/drugSituation_red.png'),
        },
        {
          name:'医疗事件',
          url:'/Personal/medicalEvent',
          imgSrc:require('images/ICON/menu/medicalEvent_grey.png'),
          imgSrc2:require('images/ICON/menu/medicalEvent_red.png'),
        },
        {
          name:'通知消息',
          url:'/Personal/notice',
          imgSrc:require('images/ICON/menu/notice_grey.png'),
          imgSrc2:require('images/ICON/menu/notice_red.png'),
        },
        {
          name:'公告消息',
          url:'/Personal/announcement',
          imgSrc:require('images/ICON/menu/notice_grey.png'),
          imgSrc2:require('images/ICON/menu/notice_red.png'),
        },
        {
          name:'修改密码',
          url:'/Personal/setting',
          imgSrc:require('images/ICON/menu/setting_grey.png'),
          imgSrc2:require('images/ICON/menu/setting_red.png'),
        }
      ]
    }
  }

  navChange(name,url){
    this.setState({
      ...this.state,
      activeMenu: url
    })
    hashHistory.push({pathname:url})
  }

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(getMesNoRead(user.authToken,1),(rs)=>{
      this.setState({
        ...this.state,
        message:rs.total
      })
    })
    $.get(getMesNoRead(user.authToken,2),(rs)=>{
      this.setState({
        ...this.state,
        adm:rs.total
      })
    })
  }

  changeNum(type){
    if(type=='message'){
      this.setState({
        ...this.state,
        message:this.state.message-1
      })
    }
    if(type=='adm'){
      this.setState({
        ...this.state,
        adm:this.state.adm-1
      })
    }
  }
  componentWillReceiveProps(nextProps){
    let indexA = hashHistory.getCurrentLocation().pathname.split('/')[1];
    let indexB = hashHistory.getCurrentLocation().pathname.split('/')[2];
    this.setState({
      activeMenu:'/'+indexA+'/'+indexB,
    })
  }

  render(){
    return(
      <div className={PersonalMenuStyle.content}>
        <h3 className="text-center">个人中心</h3>
        <ul>
          {
            this.state.user.map((o,i)=>(
              <li onClick={()=>this.navChange(o.name,o.url)} className={this.state.activeMenu==o.url?PersonalMenuStyle.active:''} key={i}>
                <img src={this.state.activeMenu==o.url?o.imgSrc2:o.imgSrc} style={{verticalAlign:'sub'}}/>&nbsp; {o.name}
                {o.name=='通知消息'&&this.state.message!=0?<span className={PersonalMenuStyle.badge_user}>{this.state.message}</span>:''}
                {o.name=='公告消息'&&this.state.adm!=0?<span className={PersonalMenuStyle.badge_user}>{this.state.adm}</span>:''}
              </li>
            ))
          }
        </ul>

      </div>
    )
  }
}

export  default UserMenu;
