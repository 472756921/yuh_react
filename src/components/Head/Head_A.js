/**
 * Created by Benson on 2017/3/30.
 */
import React from 'react';
import HeadStyle from '../../styles/header.css';
import {hashHistory} from 'react-router';
import {getMessagesNoRead,LoginOutAPI} from '../../InterFace/InterfaceAPI';


class appHead_A extends React.Component {
  constructor(props){
    super(props);
    this.state={
      messageNoRead:'',
    }
  }

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    if(user!=''&&user!=undefined){
      $.get(getMessagesNoRead(user.authToken,2),(rs)=>{
        this.setState({
          messageNoRead:rs.total,
        })
      })
    }
  }

  loginOut(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.post(LoginOutAPI(user.authToken),(rs)=>{
      sessionStorage.clear('userData');
      localStorage.clear();
      hashHistory.push({pathname:'/'});
      this.setState({
        messageNoRead:'',
      })
    })
  }

  render() {
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    let userUI;
    if(user!=''&&user!=undefined){

      userUI= <span><div><a href="#/Personal/data">{user.realName}</a></div>
            <div className={HeadStyle.verticalBar}>|</div>
            <div><a href="#/Personal/notice">消息{this.state.messageNoRead==0?'':<span className={HeadStyle.badge_user}>{this.state.messageNoRead}</span>}</a></div>
            <div className={HeadStyle.verticalBar}>|</div>
            <div><a onClick={()=>this.loginOut()}>退出</a></div>
            <div className={HeadStyle.verticalBar}>|</div></span>
    }else{
      userUI = <span><div><a href="#/login">登录</a></div>
            <div className={HeadStyle.verticalBar}>|</div>
            <div><a href="#/Agreement">注册</a></div>
            <div className={HeadStyle.verticalBar}>|</div>
            <div><a href="#/Introduction">公司简介</a></div>
            <div className={HeadStyle.verticalBar}>|</div></span>
    }

    return (
      <div className={HeadStyle.headerTop} id="top">
        <div className={HeadStyle.headerTopContent}>
          <div className="pull-left">
            <div>
              <img src={require('images/icon/phone.png')} alt="下载优医APP"/>
              <a href="http://115.28.173.39:8080/#/qr_code">手机端APP</a>
            </div>
            <div className={HeadStyle.verticalBar}>|</div>
            <div>
              <img  src={require('images/icon/telephone.png')} alt="优医热线服务"/>
              <a>400-080-8820</a>
            </div>
          </div>
          <div className="pull-right">
            {userUI}
          </div>
        </div>
      </div>
    );
  }
}
export default appHead_A;
