/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import PersonalStyle from '../../styles/Personal.css';
import {changePWD} from '../../InterFace/InterfaceAPI';
import {hashHistory} from 'react-router';

class ChangePWD extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      info:'',
    }
  }
  render(){
    return(
      <div className={PersonalStyle.infoContent}>
        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;修改密码</h3>
        <form
          onSubmit={e=>{
          e.preventDefault();

            let newPasswordAg = this.refs.newPasswordAg.value;
            let newPassword= this.refs.newPassword.value;
            let oldPassword=this.refs.oldPassword.value;

            if(newPasswordAg==''||newPassword==''||oldPassword==''){
              this.setState({
                info:'请输入完整信息'
              })
              return;
            }
            if(newPassword.length<6||newPassword.length>32){
              this.setState({
                info:'密码长度6-32位'
              })
              return;
            }
            let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
            if (!reg.test(newPassword)){
              this.setState({
                info:'至少包含一个字母和数字'
              })
              return;
            }
            if(newPassword!=newPasswordAg){
              this.setState({
                info:'两次输入的密码不一致'
              })
              return;
            }
            let postJson = {
              newPassword: this.refs.newPassword.value,
              oldPassword:this.refs.oldPassword.value,
            }

          let user = sessionStorage.getItem('userData');
          user = JSON.parse(user);
          $.ajax({
           type:'POST',
            timeout : 2000,
            contentType:'application/json;charset=UTF-8',
            url:changePWD(),
            headers: {
              "authToken":user.authToken
            },
            data:JSON.stringify(postJson),
            success:(rs)=>{
              alert('修改成功')
              sessionStorage.removeItem('userData');
              hashHistory.push({pathname:'/'});
              localStorage.clear();
            },
            error:(rs)=>{
              this.setState({
                info:'原始密码错误'
              })
            }
          })
        }}
        >
        <div style={{float:'left'}}>
          <div className={PersonalStyle.inputGroup}>
            <div>当前密码 : </div>
            <input maxLength="32" ref="oldPassword"  type="password"/>
            <span>*</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>新密码 : </div>
            <input maxLength="32" ref="newPassword"  type="password"/>
            <span>*</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>确认新密码 : </div>
            <input maxLength="32" type="password" ref="newPasswordAg" />
            <span>*</span>
            <h6 className="text-center" style={{color:'red',margin:'10px 0 0 0'}}>{this.state.info}</h6>
          </div>
        </div>
        <div className={PersonalStyle.clear}></div>
        <div className={PersonalStyle.btnGroup}>
          <button className={PersonalStyle.btnActive} type="submit" ref="changeSave">修改</button>
        </div>
      </form>
      </div>
    )
  }
}
export default ChangePWD;
