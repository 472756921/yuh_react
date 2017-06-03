/**
 * Created by Benson on 2017/4/20.
 */
import React from 'react';
import LoginStyle from '../styles/Login.css';
import {hashHistory} from 'react-router';
import {fogetPWD,getCustomerSafeAnswer,getCustomerPassword} from '../InterFace/InterfaceAPI';
let d;
class ForgetPWD extends React.Component{
  constructor(props){
    super(props);
    this.state={
      step:1
    }
  }


  componentDidMount(){
  }

  next(){
    if(this.state.step==1) {
      let userName = this.refs.userName.value;
      let idNum = this.refs.idNum.value;
      if (userName == '' || idNum == '') {
        this.refs.tishixingxi.innerText = '请完整填写信息';
        return;
      }

      if (!this.isCardNo(idNum)) {
        this.refs.tishixingxi.innerText = '身份证格式错误';
        return;
      } else {
        this.refs.tishixingxi.innerText = '';
      }
      $.get(fogetPWD(userName, idNum), (rs)=> {
        if (rs.success == false) {
          this.refs.tishixingxi.innerText = '帐号或身份证出错';
        }
        if (rs.success == true) {
          this.setState({
            step: 2,
            customerId: rs.customerId
          })
          this.refs.que.innerText = rs.customerQuestion
        }
      })
    }else if(this.state.step==2){
      let an = this.refs.ans.value;
      if(an==''){
        this.refs.tishixingxi.innerText = '请填写问题答案';
        return
      }else{
        $.get(getCustomerSafeAnswer(this.state.customerId,an),(rs)=>{
          if (rs.success == false) {
            this.refs.tishixingxi.innerText = '答案错误';
          }
          if (rs.success == true) {
            this.setState({
              ...this.state,
              step: 3
            })
            this.refs.tishixingxi.innerText = '';
          }
        })
      }
    }else if(this.state.step==3){
      let newpwd = this.refs.newpwd.value;
      let newpwdA = this.refs.newpwdA.value;
      if(newpwd==''||newpwdA==''){
        this.refs.tishixingxi.innerText = '请填新密码';
        return
      }else{
        if(newpwd.length<6||newpwd.length>32){
          this.refs.tishixingxi.innerText = '密码长度在6~32位之间';
          return
        }
        var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        if (!reg.test(newpwd)){
          this.refs.tishixingxi.innerText = '密码至少包含一个数字和一个字母';
          return
        }
        if(newpwdA!=newpwd){
          this.refs.tishixingxi.innerText = '两次输入的密码不一致';
          return
        }

        $.get(getCustomerPassword(this.state.customerId,newpwd),(rs)=>{
          if (rs.success == false) {
            this.refs.tishixingxi.innerText = '修改失败，请稍后重试';
          }
          if (rs.success == true) {
            this.setState({
              ...this.state,
              step: 4,
              ses:5
            })
            d = setInterval(()=>{
              this.setState({
                ...this.state,
                ses:this.state.ses-1
              })
              this.refs.tishixingxi.innerText = '修改成功，'+this.state.ses+'秒后跳转到首页';
              if(this.state.ses<=0){
                clearInterval(d);
                hashHistory.push({pathname:'/'});
              }
            },1000)
          }
        })
      }
    }

  }
  isCardNo(card){
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(card) === false){
      return  false;
    }
    return true;
  }

  render(){
    return(
      <div className={LoginStyle.content}>
        <div className={LoginStyle.top}>
          <img src={require('images/icon/logo.png')} onClick={()=>{hashHistory.push({pathname:'/'})}} />
        </div>
        <div className={LoginStyle.res}>
          <div className={LoginStyle.step}>
            <div className={[LoginStyle.steplist,this.state.step==1?LoginStyle.steplist_active:''].join(' ')}>身份验证</div>
            <div className={[LoginStyle.steplist,this.state.step==2?LoginStyle.steplist_active:''].join(' ')}>密保问题</div>
            <div className={[LoginStyle.steplist,this.state.step==3?LoginStyle.steplist_active:''].join(' ')}>修改完成</div>
          </div>
          <div className={LoginStyle.centerBlock} style={this.state.step==1?{}:{display:'none'}}>
              <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>账号:</div><input ref="userName" maxLength="32"/><span className={LoginStyle.red}> *</span></div>
              <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>身份证号码:</div><input ref="idNum" maxLength="18"/><span className={LoginStyle.red}> *</span></div>
          </div>
          <div className={LoginStyle.centerBlock} style={this.state.step==2?{}:{display:'none'}}>
              <div className={LoginStyle.textGroup} style={{textAlign:'center'}} ref="que"></div>
              <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>答案:</div><input ref="ans" maxLength="50"/><span className={LoginStyle.red}> *</span></div>
          </div>
          <div className={LoginStyle.centerBlock} style={this.state.step==3?{}:{display:'none'}}>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>新密码:</div><input ref="newpwd" type="password"  maxLength="32"/><span className={LoginStyle.red}> *</span></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>确认密码:</div><input ref="newpwdA" type="password"  maxLength="32"/><span className={LoginStyle.red}> *</span></div>
          </div>

          <div className={LoginStyle.centerBlock} style={this.state.step==4?{}:{display:'none'}}>
            <h3 style={{textAlign:'center'}}>修改成功</h3>
          </div>

          <div style={{textAlign:'center',color:'red'}} ref="tishixingxi"></div>
          {this.state.step==4?<button className={[LoginStyle.btn_next,'center-block'].join(' ')} onClick={()=>this.next()}>回首页</button>:<button className={[LoginStyle.btn_next,'center-block'].join(' ')} onClick={()=>this.next()}>下一步</button>}


        </div>
      </div>
      )
  }
}

export default ForgetPWD;
