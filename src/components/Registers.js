/**
 * Created by Benson on 2017/4/24.
 */
import React from 'react';
import LoginStyle from '../styles/Login.css';
import {hashHistory} from 'react-router';
import IDCardCkech from './IDCardCheck';
import {registerCheckUserName,GetProvinces,GetCity,registerCheckregisterCheckUserName,registerCheckreGroup,register} from '../InterFace/InterfaceAPI';
import Page from './Page/Page';

class Registers extends React.Component{
  constructor(props){
    super(props);
    this.state={
      step:1,
      info:'',
      pr:[],
      city:[],
      cityC:[],
      data:[]
    }
  }

  componentWillMount(){
    $.get(GetProvinces(),(rs)=>{
      this.setState({
        ...this.state,
        pr:rs,
      })
      this.getCity(1);
    })
  }

  getCity(id,te){
    $.get(GetCity(id),(rs)=>{
      if(te!=undefined){
        this.setState({
          ...this.state,
          cityC:rs,
        })
        this.findGroup()
      }else{
        this.setState({
          ...this.state,
          city:rs,
        })
      }
    })
  }
  next(){
    if(this.state.step==1){
      let un = this.refs.userName.value;
      let pwd = this.refs.pwd.value;
      let pwdAg = this.refs.pwdAg.value;
      let safeQuestion = this.refs.safeQuestion.value;
      let safeAnswer = this.refs.safeAnswer.value;
      if(un==''||pwd==''||pwdAg==''|| safeQuestion == '' || safeAnswer == ''){
        this.setState({
          ...this.state,
          info:'请完整填写账号信息'
        })
        return
      }
      if(un.length>32||un.length<6){
        this.setState({
          ...this.state,
          info:'账号长度必须在6~32位之间'
        })
        return
      }
      if(pwd!=pwdAg){
        this.setState({
          ...this.state,
          info:'两次输入的密码不一致'
        })
        return
      }
      var reg=new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$).{6,32}$/);
      if(!reg.test(pwd)){
        this.setState({
          ...this.state,
          info:'密码必须包含数字和字母，且长度在6~32位之间'
        })
        return
      }
      let ua=true;
      $.get(registerCheckUserName(un),(rs)=>{
        if(rs.used){
          this.setState({
            ...this.state,
            info:'对不起该账号已经被使用，请换个账号试试'
          })
          ua=false
        }
      })
      if(!ua){
        return
      }
      this.setState({
        ...this.state,
        step:2,
        info:''
      })
    }else if(this.state.step==2){
      let id = this.refs.IDDard.value;
      let userPet = this.refs.userPet.value;
      let bri = this.refs.bri.value;
      if(id==''||userPet==''||bri==''){
        this.setState({
          ...this.state,
          info: '请完整填写个人信息'
        })
        return
      }
      if(userPet.length>20){
        this.setState({
          ...this.state,
          info: '用户姓名长度不能超过20'
        })
        return
      }
      let check = IDCardCkech(id);
      if(check.pass){
        $.get(registerCheckregisterCheckUserName(id),(rs)=>{
          if(!rs.used){
            this.getTheGroupList(this.refs.cityC.value,this.refs.prC.value,1);
          }else{
            this.setState({
              ...this.state,
              info: '身份证号码已经被使用了',
            })
          }
        })
      }else{
        this.setState({
          ...this.state,
          info: '身份证号码错误'
        })
        return
      }
    }
  }
  nameCheck(){
    let un = this.refs.userName;
    un.value=un.value.replace(/\s+/g,'')
  }
  change(type){
    if(type=='A'){
      let prID = this.refs.pr.value;
      this.getCity(prID);
    }else{
      let prID = this.refs.prC.value;
      this.getCity(prID,'tem');
    }
  }
  checkBrth(){
    let id = this.refs.IDDard.value;
    let check = IDCardCkech(id);
    if(!check.pass){
      this.setState({
        ...this.state,
        info:'身份证格式错误'
      })
    }else{
      this.setState({
        ...this.state,
        info:''
      })
      let br = id.substr(6,4)+'-'+id.substr(10,2)+'-'+id.substr(12,2);
      this.refs.bri.value=br;
    }
  }
  findGroup(){
    let pr = this.refs.prC.value;
    let city = this.refs.cityC.value;
    this.getTheGroupList(1,city,pr);
  }

  getTheGroupList(pageNow,city,pr){
    $.get(registerCheckreGroup(city,pr,pageNow),(rs)=>{
      this.setState({
        ...this.state,
        data:rs.results,
        pageNow:pageNow,
        pages:rs.pages,
        total:rs.total,
        info: '',
        step: 3
      })
    })
  }
  pageChange(pageNow){
    let pr = this.refs.prC.value;
    let city = this.refs.cityC.value;
    this.getTheGroupList(pageNow,city,pr);
  }
  regist(groupID){
    let POSTJSON={
      account:this.refs.userName.value,
      password:this.refs.pwd.value,
      idCardNumber:this.refs.IDDard.value,
      realName:this.refs.userPet.value,
      birthday:this.refs.bri.value,
      provinceId:this.refs.pr.value,
      cityId:this.refs.city.value,
      gender:this.refs.sex.value,
      groupId:groupID,
      icon:'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',
      safeQuestion:this.refs.safeQuestion.value,
      safeAnswer:this.refs.safeAnswer.value,
    }

    $.post(register(),JSON.stringify(POSTJSON),(rs)=>{
      let user = sessionStorage.getItem('userData');
      sessionStorage.setItem('userData', JSON.stringify(rs));
      hashHistory.push({pathname:'/'});
    })

  }

  render(){
    let list;
    if(this.state.step==3){
      list = this.state.data.map((o,i)=>{
        return(
          <div key={i} className={LoginStyle.GroupTeam}>
            <img src={o.logo} width="150" height="150"/>
            <div>
              <h4>{o.name}</h4>
              <div>{o.info}</div>
              <button onClick={()=>this.regist(o.id)}>加入团队</button>
            </div>
          </div>
        )
      })
    }

    return(
      <div className={LoginStyle.content}>
        <div className={LoginStyle.top}>
          <img src={require('images/icon/logo.png')} onClick={()=>{hashHistory.push({pathname:'/'})}} />
        </div>

        <div className={LoginStyle.res} style={{paddingTop:'30px'}}>
          <div className={LoginStyle.step}>
            <div className={[LoginStyle.steplist,this.state.step==1?LoginStyle.steplist_active:''].join(' ')} >填写账号信息</div>
            <div className={[LoginStyle.steplist,this.state.step==2?LoginStyle.steplist_active:''].join(' ')} >填写个人资料</div>
            <div className={[LoginStyle.steplist,this.state.step==3?LoginStyle.steplist_active:''].join(' ')} >选择健康团队</div>
          </div>
          <div className={LoginStyle.centerBlock} style={this.state.step==1?{display:'block'}:{display:'none'}}>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>账号: </div><input ref="userName" placeholder="长度在6~32位之间" onKeyDown={()=>{this.nameCheck()}}/><span className={LoginStyle.red}> *</span></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>密码: </div><input ref="pwd" placeholder="长度在6~32位之间，且包含字母和数字" type="password"/><span className={LoginStyle.red}> *</span></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>确认密码: </div><input ref="pwdAg" type="password"/><span className={LoginStyle.red}> *</span></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>密保问题: </div><input ref="safeQuestion" type="text"/><span className={LoginStyle.red}> *</span></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>密保答案: </div><input ref="safeAnswer" type="text"/><span className={LoginStyle.red}> *</span></div>
          </div>

          <div className={LoginStyle.centerBlock} style={this.state.step==2?{display:'block'}:{display:'none'}}>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>姓名: </div><input ref="userPet" placeholder="长度在不能大于20个字符"/><span className={LoginStyle.red}> *</span></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>性别: </div>
              <select ref="sex">
                <option value="MALE">男</option>
                <option value="FAMALE">女</option>
              </select>
              <span className={LoginStyle.red}> *</span>
            </div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>身份证号码: </div><input onBlur={()=>this.checkBrth()} ref="IDDard" type="text"/><span className={LoginStyle.red}> *</span></div>
            <div className={LoginStyle.textGroup}><div className={LoginStyle.text}>出生年月: </div><input ref="bri" type="text" disabled/><span className={LoginStyle.red}> *</span></div>
            <div className={LoginStyle.textGroup}>
              <div className={LoginStyle.text}>所在地: </div>
              <select style={{width:'125px'}} onChange={()=>this.change('A')} ref="pr">
                {this.state.pr.map((o,i)=>(
                  <option key={i} value={o.id}>{o.name}</option>
                ))}
              </select>
              &nbsp;
              <select style={{width:'130px'}} ref="city">
                {this.state.city.map((o,i)=>(
                  <option key={i} value={o.id}>{o.name}</option>
                ))}
              </select>
              <span className={LoginStyle.red}> *</span>
            </div>
          </div>

          <div className={LoginStyle.centerBlock} style={this.state.step==3?{display:'block'}:{display:'none'}}>
            <div className={LoginStyle.textGroup}>
              <div className={LoginStyle.text}>团队所在地: </div>
              <select style={{width:'125px'}} onChange={()=>this.change('B')} ref="prC">
                {this.state.pr.map((o,i)=>(
                  <option key={i} value={o.id}>{o.name}</option>
                ))}
              </select>
              &nbsp;
              <select style={{width:'130px'}} ref="cityC" onChange={()=>this.findGroup()}>
                {this.state.cityC.map((o,i)=>(
                  <option key={i} value={o.id}>{o.name}</option>
                ))}
              </select>
              <span className={LoginStyle.red}></span>
            </div>
            <div className={LoginStyle.GroupTeams}>
              {list}
              <Page data={{pageNum:this.state.pages,total:this.state.total,pageNow:this.state.pageNow}}  pageChange={(pageNow)=>this.pageChange(pageNow)}/>
            </div>
          </div>

        </div>
        <div className="text-center" style={{color:'red'}}>{this.state.info}</div>
        <div className={LoginStyle.clear}></div>
        {this.state.step==3?'':<button className={[LoginStyle.btn_next,'center-block'].join(' ')} onClick={()=>this.next()}>下一步</button>}
      </div>
    )
  }
}
export default Registers;
