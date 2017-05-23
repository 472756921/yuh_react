/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import IDCardCkech from '../IDCardCheck';
import PersonalStyle from '../../styles/Personal.css';
import {GETUserData,GetProvinces,GetCity,POSTUserData,registerCheckregisterCheckUserName} from '../../InterFace/InterfaceAPI';
import Load from '../Load';

let postJson;
class UserData extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userData: '',
      pro:'',
      city:'',
      changeFlag:true,
      states:'none'
    }
  }

  changeHead(){
    return  $("#File").click()
  }

  provinceChange(){
    let province = this.refs.province.value;
    $.get(GetCity(province),(rs)=>{
      this.setState({
        city:rs,
        userData:{
          ...this.state.userData,
          city:''
        }
      })
    })
  }

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);

    $.get(GETUserData(user.authToken),(rs)=>{
      $.get(GetProvinces(),(pro)=>{
        $.get(GetCity(rs.province.id),(city)=>{
          this.setState({
            userData:rs,
            pro:pro,
            city:city
          })
          postJson=this.state.userData;
        })
      })
    })

  }

  componentDidMount(){
    let changeSave = this.refs.changeSave;

    $("#File").change((es)=>{
      let file = this.refs.uploadImg.files[0];
      console.log(file.size)
      let max_size = 1024*1024;
      if(file.size>max_size){
        alert("图片大小不能超过1M");
        return false;
      }
      if (!/image\/\w+/.test(file.type)) {
        alert("只能选择图片");
        return false;
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        postJson[es.target.name]=e.target.result.split(',')[1];
        this.setState({
          ...this.state,
          userData:{
            ...this.state.userData,
            icon:e.target.result
          }
        })
      }.bind(this);
      change(this)
    })

    $('input').change((e)=>{
      change(this)
      let name=e.target.name;
      postJson[name]=e.target.value;
    })
    $('select').change((e)=>{
      change(this)
      let name=e.target.name;
      postJson[name]={
        name:postJson[name].name,
        id: e.target.value
      };
    })

    function change(_this){
      if(_this.state.changeFlag){
        changeSave.disabled=false;
        let s = PersonalStyle.btnActive;
        changeSave.className=s;
      }
    };
  }

  checkBrth(){
    let id = this.refs.idCardNumber.value;
    if(id==''){
      return
    }
    $.get(registerCheckregisterCheckUserName(id),(rs)=>{
      if(rs.used){
        this.setState({
          ...this.state,
          info:'号码已被使用',
          changeFlag:false
        })
        return
      }
    })
    let check = IDCardCkech(id);
    if(!check.pass){
      this.setState({
        ...this.state,
        info:'身份证格式错误',
        changeFlag:false
      })
    }else{
      this.setState({
        ...this.state,
        info:'',
        changeFlag:true
      })
      let br = id.substr(6,4)+'-'+id.substr(10,2)+'-'+id.substr(12,2);
      this.refs.bir.value=br;
      postJson['birthday']=br;
    }
  }

  render(){
    let p,c;
    if(this.state.city!=''){
      p = this.state.pro.map((o,i)=>{
        if(this.state.userData.province.name!= o.name){
          return(
            <option key={i} value={o.id}>{o.name}</option>
          )
        }else{
          return(<option selected key={i} value={o.id}>{o.name}</option>)
        }
      })
      c = this.state.city.map((o,i)=>{
        if(this.state.userData.city.name!= o.name){
          return(
            <option key={i} value={o.id}>{o.name}</option>
          )
        }
      })
    }
    return(
      <div className={PersonalStyle.infoContent}>
        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;个人资料</h3>
        {this.state.states!='none'?<Load />:''}
        <form onSubmit={e=>{
          e.preventDefault();
          let user = sessionStorage.getItem('userData');
          user = JSON.parse(user);
          if(!this.state.changeFlag){
            alert(this.state.info);
            return;
          }
          if(this.refs.city.value==''||this.refs.city.value==null){
            alert('请选择城市')
            return;
          }
          this.setState({
            ...this.state,
            states:'show',
          })
          $.post(POSTUserData(user.authToken),JSON.stringify(postJson),(rs,code)=>{
            if(code=='success'){
              alert('修改成功')
              this.setState({
                ...this.state,
                states:'none',
                })

            }
          })
          }}
          >
        <div style={{float:'left'}}>
          <div className={PersonalStyle.inputGroup}>
            <div>姓名 : </div>
            <input placeholder={this.state.userData.realName} name="realName" disabled/>
            <span>*</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>性别 : </div>
            <input placeholder={this.state.userData.gender=='MALE'?'男':'女'} disabled/>
            <span>*</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>省份 : </div>
            <select onChange={()=>this.provinceChange()} ref="province"  name="province">
              {p}
            </select>
            <span>*</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>城市 : </div>
            <select ref="city" name="city">
              {this.state.userData.city!=undefined?<option selected value={this.state.userData.city.id}>{this.state.userData.city.name}</option>:''}
              {c}
            </select>
            <span>*</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>详细地址 : </div>
            <input placeholder={this.state.userData.address} name="address"/>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>出生年月 : </div>
            <input ref="bir" placeholder={this.state.userData.birthday} name="birthday" disabled/>
            <span>*</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>联系电话 : </div>
            <input placeholder={this.state.userData.backupPhoneNumber} name="backupPhoneNumber"/>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>手机号码 : </div>
            <input placeholder={this.state.userData.phoneNumber} name="phoneNumber"/>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>邮箱地址 : </div>
            <input placeholder={this.state.userData.email} name="email"/>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>身份证号 : </div>
            <input placeholder={this.state.userData.idCardNumber} name="idCardNumber" ref="idCardNumber" onBlur={()=>this.checkBrth()}/>
            <span>*{this.state.info}</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>职业 : </div>
            <input placeholder={this.state.userData.occupation}  name="occupation"/>
          </div>
        </div>

        <div style={{float:'left',width:'210px',marginLeft:'20px'}}>
          <div className={['center-block',PersonalStyle.userHeadImg].join(' ')} onClick={()=>this.changeHead()}>
            <img src={this.state.userData.icon} width="140"/>
          </div>
          <div style={{fontSize:'16px',margin:'20px 0 0',color:'#666'}}>服务类型：<span style={{color:'#e60012'}}>{this.state.userData.servicePackageName}</span></div>
          <div style={{fontSize:'16px',margin:'16px 0 0',color:'#666'}}>截止日期：<span>{this.state.userData.servicePackageEndTime}</span></div>
          <div style={{fontSize:'16px',margin:'16px 0 0',color:'#666'}}>主管医生：<span style={{color:'#e60012'}}>{this.state.userData.attendingDoctor}</span></div>
          <div style={{fontSize:'16px',margin:'16px 0 0',color:'#666'}}>所属团队：<div style={{color:'#e60012'}}>{this.state.userData.teamName}</div></div>
        </div>
        <div className={PersonalStyle.clear}></div>
        <div className={PersonalStyle.btnGroup}>
          <button  type="submit" className={PersonalStyle.btn} ref="changeSave" disabled>修改</button>
        </div>
        <input type="file" id="File" style={{display:'none'}} ref="uploadImg" name="icon"/>
        </form>
      </div>
    )
  }
}
export default UserData;
