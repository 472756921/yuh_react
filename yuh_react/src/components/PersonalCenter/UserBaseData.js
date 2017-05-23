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

  render(){
    return (
      <div className={PersonalStyle.infoContent}>
        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;基本数据</h3>
        <form onSubmit={e=>{
          e.preventDefault();
          let user = sessionStorage.getItem('userData');
          user = JSON.parse(user);
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
            <input placeholder={this.state.baseData.height} name="height" />
            <span style={{color:'#666'}}>cm</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>体重 : </div>
            <input placeholder={this.state.baseData.weight}  name="weight" />
            <span style={{color:'#666'}}>kg</span>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>病症 : </div>
            <select className="form-control" name="chronicDiseaseType">
              <option value="1" selected={this.state.baseData.chronicDiseaseType==1?'ture':'false'}>高血压</option>
              <option value="2" selected={this.state.baseData.chronicDiseaseType==2?'ture':'false'}>糖尿病</option>
              <option value="3" selected={this.state.baseData.chronicDiseaseType==3?'ture':'false'}>高血压兼糖尿病</option>
            </select>
          </div>
          <div className={PersonalStyle.inputGroup}>
            <div>健康状况 : </div>
            <textarea placeholder={this.state.baseData.healthCondition} name="healthCondition"></textarea>
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
