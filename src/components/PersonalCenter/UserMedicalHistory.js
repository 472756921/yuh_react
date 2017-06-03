/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import PersonalStyle from '../../styles/Personal.css';
import {GETUserHistory,POSTUserHistory,DelUserHistory} from '../../InterFace/InterfaceAPI';

let postJson;
class UserMedicalHistory extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      history:'',
    }
  }

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(GETUserHistory(user.authToken),(rs)=>{
      postJson = rs;
      this.setState({
        history: rs
      })
    })
  }

  componentDidMount(){
    let changeSave = this.refs.changeSave;
    document.getElementById("flatpickr_tryme").flatpickr();

    $('input, textarea, radio').change((e)=>{
      change()
      let name=e.target.name;
      postJson[name]=e.target.value;
    })
    function change(){
      changeSave.disabled=false;
      let s = PersonalStyle.btnActive;
      changeSave.className=s;
    }
  };

  addTheHistory(){
    let midDate = this.refs.midDate.value;
    let sqation = this.refs.sqation.value;
    if(midDate==''||sqation==''){
      return
    }
    this.setState({
      history:{
        ...this.state.history,
        externalSituations: [...this.state.history.externalSituations,{content:sqation,treatmentTime:midDate,isUI:true}]
      }
    })
    this.refs.sqation.value= '';
    this.refs.midDate.value= '';
    postJson.externalSituations.push({content:sqation,treatmentTime:midDate});
  }

  del(id,i){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    if (!confirm('确认删除？')){
      return ;
    }
    let externalSituations = this.state.history.externalSituations;
    if(id==undefined){
      let a = externalSituations.findIndex((e,index,a)=>{ return index==i})
      this.state.history.externalSituations.splice(a,1);
      this.setState({
        ...this.state,
      })
    }else{
      $.get(DelUserHistory(id,user.authToken),(rs)=>{
        if(rs.isDelete){
          let a = externalSituations.findIndex((e,i,a)=>{ return e.id==id})
          this.state.history.externalSituations.splice(a,1);
          this.setState({
            ...this.state,
          })
        }
      })
    }
  }

  render(){
    $('input[name="drinkingHistory"]').map((i,o)=>{
      if(o.value==this.state.history.drinkingHistory){
        o.defaultChecked=true;
      }
    })
    $('input[name="smokingHistory"]').map((i,o)=>{
      if(o.value==this.state.history.smokingHistory){
        o.defaultChecked=true;
      }
    })

    let mid;
    if(this.state.history.externalSituations!=undefined){
      mid = this.state.history.externalSituations.map((o,i)=>(
        <tr key={i}>
          <td>{o.treatmentTime}</td>
          <td>{o.content}</td>
          <td style={{cursor:"pointer"}} onClick={()=>this.del(o.id,i)}>删除</td>
        </tr>
      ))
    }

    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    return(
      <div className={PersonalStyle.infoContent}>
        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;既往病史</h3>
        <form onSubmit={e=>{
          e.preventDefault();
          $.post(POSTUserHistory(user.authToken),JSON.stringify(postJson),(rs,code)=>{
            if(code='success'){
              alert('修改成功')
              $.get(GETUserHistory(user.authToken),(rs)=>{
                postJson = rs;
                this.setState({
                  history: rs
                })
              })
            }
          })
        }}>
          <div style={{float:'left',width:'100%'}}>
            <div className={PersonalStyle.inputGroup2}>
              <div>疾病史 : </div>
              <textarea maxLength="250" name="medical" placeholder={this.state.history.medical}></textarea>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>传染病史 : </div>
              <textarea maxLength="250" name="infection" placeholder={this.state.history.infection}></textarea>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>外伤史 : </div>
              <textarea maxLength="250" name="trauma" placeholder={this.state.history.trauma}></textarea>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>手术史 : </div>
              <textarea maxLength="250" name="operation" placeholder={this.state.history.operation}></textarea>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>预防接种史 : </div>
              <textarea maxLength="250" name="vaccinationHistory" placeholder={this.state.history.vaccinationHistory}></textarea>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>中毒史 : </div>
              <textarea maxLength="250" name="allergic" placeholder={this.state.history.allergic}></textarea>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>输血史 : </div>
              <textarea maxLength="250" name='blood' placeholder={this.state.history.blood}></textarea>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>家族病史 : </div>
              <textarea maxLength="250" name="familyMedical" placeholder={this.state.history.familyMedical}></textarea>
            </div>
            {user.gender=='MALE'?'':  <div className={PersonalStyle.inputGroup2}>
              <div>孕娩、流产史 : </div>
              <textarea maxLength="250" name="pregnancy" placeholder={this.state.history.pregnancy}></textarea>
            </div>}
            {user.gender=='MALE'?'':
            <div className={PersonalStyle.inputGroup2}>
              <div>经期情况 : </div>
              <textarea maxLength="250" name="menstruation" placeholder={this.state.history.menstruation}></textarea>
            </div>}
            <div className={PersonalStyle.inputGroup2}>
              <div>其他补充情况 : </div>
              <textarea maxLength="250" name="others" placeholder={this.state.history.others}></textarea>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>系统回顾 : </div>
              <textarea maxLength="250" name="retrospection" placeholder={this.state.history.retrospection}></textarea>
            </div>

            <div className={PersonalStyle.inputGroup2}>
              <div>吸烟史 : </div>
              <div className={PersonalStyle.UserRadio}>
                <label>
                  <input type="radio" name="smokingHistory"  value="never" /> 从不
                </label>
                <label>
                  <input type="radio" name="smokingHistory"  value="light" /> 偶尔
                </label>
                <label>
                  <input type="radio" name="smokingHistory"  value="moderate" /> 经常
                </label>
                <label>
                  <input type="radio" name="smokingHistory"  value="severe" /> 每天
                </label>
              </div>
            </div>
            <div className={PersonalStyle.inputGroup2}>
              <div>饮酒史 :</div>
              <div className={PersonalStyle.UserRadio}>
                <label>
                  <input type="radio" name="drinkingHistory"  value="never" /> 从不
                </label>
                <label>
                  <input type="radio" name="drinkingHistory"  value="light" /> 偶尔
                </label>
                <label>
                  <input type="radio" name="drinkingHistory"  value="moderate"/> 经常
                </label>
                <label>
                  <input type="radio" name="drinkingHistory"  value="severe" /> 每天
                </label>
              </div>
            </div>
          </div>

          <div className={PersonalStyle.clear}></div>
        <div className={PersonalStyle.bottomBorder}></div>

        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;系统外就医情况</h3>
        <table className="table" style={{margin:'40px 0'}}>
          <tbody>
            <tr className='active'>
              <td>就医日期</td>
              <td width="600">情况描述</td>
              <td>操作</td>
            </tr>
            {mid}

          </tbody>
        </table>


        <div className={PersonalStyle.inputGroup}>
          <div>就医日期 : </div>
          <input id="flatpickr_tryme" name="birthday" style={{width:'200px'}} ref="midDate" data-max-date='today'/>
          <span>*请选择就医日期</span>
        </div>
        <div className={PersonalStyle.inputGroup2}>
          <div>情况描述 : </div>
          <textarea maxLength="250" ref="sqation"></textarea>
          <br/>
          <span style={{marginLeft:'130px',color:'red'}}>*请简要描述就医情况</span>
        </div>

        <div className={PersonalStyle.btnGroup}>
          <button type="button" className={PersonalStyle.btnActive} onClick={()=>this.addTheHistory()}>添加</button>
        </div>
        <div className={PersonalStyle.btnGroup}>
          <button type="submit" className={PersonalStyle.btn} ref="changeSave" disabled>修改</button>
        </div>
        </form>
      </div>
    )
  }
}
export default UserMedicalHistory;
