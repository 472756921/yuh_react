/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import PersonalStyle from '../../styles/Personal.css';
import {GETUserBaseData,POSTUserBaseData} from '../../InterFace/InterfaceAPI';

let postJson;
class UserBaseData extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      baseData:'',
    }
  }
  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(GETUserBaseData(user.authToken),(rs)=>{
      postJson = rs;
      this.setState({
        baseData: rs
      })
    })
  }

  componentDidMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    let changeSave = this.refs.changeSave;
    $('input,textarea,select').change((e)=>{
      change()
      let name=e.target.name;
      postJson[name]=e.target.value;
    })

    function change(){
      changeSave.disabled=false;
      let s = PersonalStyle.btnActive;
      changeSave.className=s;
    }
  }

  onChange(event){
    event.target.value = event.target.value.replace(/[^\d.]/g,'')
  };

  render(){
    $('input[type="checkbox"]').map((i,o)=>{
      if(this.state.baseData.chronicDiseaseType==3){
        o.defaultChecked=true;
      }
      if(o.value==this.state.baseData.chronicDiseaseType){
        o.defaultChecked=true;
      }
    })

    return (
      <div className={PersonalStyle.infoContent}>
        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;基本数据</h3>
        <form onSubmit={e=>{
          e.preventDefault();
          let user = sessionStorage.getItem('userData');
          user = JSON.parse(user);

          let ct1 = this.refs.ct1;
          let ct2 = this.refs.ct2;

          if(ct1.checked){
             postJson['chronicDiseaseType']=1;
          }
          if(ct2.checked){
             postJson['chronicDiseaseType']=2;
          }
          if(ct2.checked&&ct1.checked){
             postJson['chronicDiseaseType']=3;
          }
          if(!ct1.checked&&!ct2.checked){
            alert('请至少选择一项病症');
            return;
          }

          $.post(POSTUserBaseData(user.authToken),JSON.stringify(postJson),(rs,code)=>{
            if(code=='success'){
              alert('修改成功')
              this.setState({
                ...this.state
              })
            }
          })
          }}>
        <div style={{float:'left'}}>
          <div className={PersonalStyle.inputGroup}>
            <div>身高 : </div>
            <input onChange={node=>this.onChange(node)} maxLength="3" placeholder={this.state.baseData.height} name="height" />
            <span style={{color:'#666'}}>cm</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>体重 : </div>
            <input onChange={node=>this.onChange(node)} maxLength="4" placeholder={this.state.baseData.weight}  name="weight" />
            <span style={{color:'#666'}}>kg</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>病症 : </div>
            <div style={{textAlign:'left'}}>
              <input type="checkbox" style={{width:"12px",verticalAlign:'sub'}} value="1" name="chronicDiseaseType" ref="ct1"/>
              <b style={{fontWeight:'400'}}> 高血压</b>
            </div>
            <div style={{textAlign:'left'}}>
              <input type="checkbox" style={{width:"12px",verticalAlign:'sub'}} value="2" name="chronicDiseaseType" ref="ct2"/>
              <b style={{fontWeight:'400'}}> 糖尿病</b>
            </div>
          </div>
          <div className={PersonalStyle.clear}></div>
          <div className={PersonalStyle.inputGroup}>
            <div>健康状况 : </div>
            <textarea maxLength="250" placeholder={this.state.baseData.healthCondition} name="healthCondition"></textarea>
          </div>
        </div>
        <div className={PersonalStyle.clear}></div>
        <div className={PersonalStyle.btnGroup}>
          <button className={PersonalStyle.btn} type="submit" ref="changeSave" disabled>修改</button>
        </div>
        </form>
      </div>
    )
  }
}
export default UserBaseData;
