/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import PersonalStyle from '../../styles/Personal.css';
import {GETUserEvent,PostUserEvent} from '../../InterFace/InterfaceAPI';

let postJson;
class UserMedicalEvent extends React.Component{
  constructor(props) {
    super(props);
    this.state={
       event:'',
    }
  }
  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(GETUserEvent(user.authToken),(rs)=>{
      postJson = rs;
      this.setState({
        event: rs
      })
    })
  }
  componentDidMount(){
    document.getElementById("flatpickr_tryme").flatpickr();
  }
  render(){
    return (
      <div className={PersonalStyle.infoContent}>
        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;医疗事件</h3>
        <form
          onSubmit={e=>{
          e.preventDefault();


          postJson = {
            ...postJson,
            eventId:this.refs.eventId.value
          }
          if(this.refs.description.value!=''){
            postJson = {
              ...postJson,
              description: this.refs.description.value,
            }
          }
          if(this.refs.time.value!=''){
            postJson = {
              ...postJson,
              time:this.refs.time.value,
            }
          }

          let user = sessionStorage.getItem('userData');
          user = JSON.parse(user);
          $.post(PostUserEvent(user.authToken),JSON.stringify(postJson),(rs,code)=>{
            if(code='success'){
              alert('修改成功')
            }
          })
        }}
        >
          <div style={{float:'left'}}>
            <div className={PersonalStyle.inputGroup}>
              <div>发生时间 : </div>
              <input placeholder={this.state.event.time} ref="time" id="flatpickr_tryme" data-max-date="today"/>
            </div>
            <div className={PersonalStyle.inputGroup}>
              <div>发生类型 : </div>
              <select className="form-control" ref="eventId">
                <option selected={this.state.event.eventId==1?'selected':''} value="1">急性心肌梗死</option>
                <option selected={this.state.event.eventId==2?'selected':''} value="2">冠心病死亡</option>
                <option selected={this.state.event.eventId==3?'selected':''} value="3">蛛网膜下腔出血</option>
                <option selected={this.state.event.eventId==4?'selected':''} value="4">腔隙性脑梗塞</option>
                <option selected={this.state.event.eventId==5?'selected':''} value="5">脑栓塞</option>
                <option selected={this.state.event.eventId==6?'selected':''} value="6">心脏性猝死</option>
                <option selected={this.state.event.eventId==7?'selected':''} value="7">其他血管事件</option>
              </select>
            </div>
            <div className={PersonalStyle.inputGroup}>
              <div>其他类型描述 : </div>
              <textarea maxLength="250" ref="description" placeholder={this.state.event.description}></textarea>
            </div>
          </div>
          <div className={PersonalStyle.clear}></div>
          <div className={PersonalStyle.btnGroup}>
            <button className={PersonalStyle.btnActive} ref="changeSave">修改</button>
          </div>
        </form>
      </div>
    )
  }
}
export default UserMedicalEvent;
