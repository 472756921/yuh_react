/**
 * Created by Benson on 2017/4/20.
 */
import React from 'react';
import LoginStyle from '../styles/Login.css';
import {hashHistory} from 'react-router';
import {LoginAPI} from '../InterFace/InterfaceAPI';

class Login extends React.Component{
  login(){
    let userName = this.refs.userName.value;
    let pwd = this.refs.pwd.value;
    let yzm = this.refs.yzm.value;
    let logasguardian = this.refs.logasguardian;
    let warring = this.refs.warring;
    let remberPWD = this.refs.remberPWD;

    if(userName==''||pwd==''||yzm==''){
      warring.innerText='请填写账号、密码、验证码'
      return ;
    }

    let postJson={
      account:userName,
      captcha:yzm,
      password:pwd,
      logasguardian:logasguardian.checked
    };

    $.ajax({
      type:'POST',
      timeout : 2000,
      contentType:'application/json;charset=UTF-8',
      url:LoginAPI(),
      crossDomain: true,
      xhrFields:{ withCredentials: true },
      data:JSON.stringify(postJson),
      success:(rs)=>{
        try{
          sessionStorage.setItem('userData', JSON.stringify(rs));
          if(rs.type!=0){
            this.postMessages(rs);
          }else{
            hashHistory.push({pathname:'/'});
          }
          if(remberPWD.checked){
            localStorage.setItem('userData',  JSON.stringify({userName:userName,pwd:pwd}));
            localStorage.setItem('userInfroData',  JSON.stringify(rs));
          }else{
            localStorage.clear();
          }
        }catch(e){
          alert("您的浏览器开起了秘密浏览模式, 请关闭该模式后重试.");
          throw(e);
        }
      },
      error:(rs)=>{
        warring.innerText=rs.responseJSON.message;
        this.changeYZM();
      }
    })
  }
  changeYZM(){
    this.refs.YZMIMG.src='http://121.42.142.228:8080/captcha' + "?" + Math.random();
  }

  forgetPWD(){
    hashHistory.push({pathname:'forgetPWD'});
  }

  componentDidMount(){
    this.changeYZM()
    let user = localStorage.getItem('userData');
    if(user!=null){
      let userData = JSON.parse(user);
      this.refs.userName.value=userData.userName;
      this.refs.pwd.value=userData.pwd;
    }
    $('#yzm').keyup((event)=>{
      if(event.keyCode ==13){
        this.login();
      }
    });
  }

  postMessages(rs){
    document.getElementById("child").contentWindow.postMessage(rs,'http://121.42.142.228:8080/#/login')
     window.location='http://121.42.142.228:8080';
  }

  render(){
    return(
      <div className={LoginStyle.content}>
        <div className={LoginStyle.top}>
          <img src={require('images/icon/logo.png')} onClick={()=>{hashHistory.push({pathname:'/'})}} />
        </div>
        <iframe style={{opacity:'0',position:'absolute'}} id="child" src='http://121.42.142.228:8080/#/login' onLoad={()=>{this.refs.YZMIMG.src='http://121.42.142.228:8080/captcha' + "?" + Math.random();}} allowFullScreen></iframe>
        <div className={LoginStyle.res}>
          <div className={LoginStyle.leftT}><img src={require('images/banner/loginBanner.jpg')}/></div>
          <div className={LoginStyle.rightT}>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>账号:</div><input ref="userName"/></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>密码:</div><input ref="pwd" type="password"/></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>验证码:</div><input id="yzm" ref="yzm" className={LoginStyle.yzm}/>
              <img height="35px" src='http://121.42.142.228:8080/captcha' ref="YZMIMG" style={{verticalAlign:'top',cursor:'pointer'}} title="点击切换" onClick={()=>this.changeYZM()}/>
            </div>
            <div>
              <div className={LoginStyle.renm}>
                <input type="checkbox" ref="remberPWD"/>
                <span> 记住密码</span>
              </div>
              <div className={LoginStyle.tt}><span onClick={()=>this.forgetPWD()}>忘记密码</span> | <span onClick={()=>{hashHistory.push({pathname:'Agreement'});}}>注册账号</span></div>
            </div>
            <div className={LoginStyle.clear}></div>
            <div className={LoginStyle.renm}>
              <input type="checkbox" ref="logasguardian"/>
              <span> 监护人登录</span>
            </div>
            <div className={LoginStyle.clear}></div>
            <div className={LoginStyle.warring} ref="warring"></div>
            <button className={LoginStyle.btn_back} onClick={()=>this.login()}>登录</button>
          </div>
        </div>
      </div>
      )
  }
}

export default Login;
