/**
 * Created by Benson on 2017/4/13.
 */
import React from 'react';
import {ASKMDatile,ASKMDatileUserInput} from '../../../InterFace/InterfaceAPI';
import ASKDatileStyle from '../../../styles/ASKMDatile.css';

class ASKM extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:''
    }
  };

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);

    $.get(ASKMDatile(1,10,this.props.id,user.authToken),(rs)=>{
      this.setState({
        data: rs
      })
    })
  };

  usreInput(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    let userInput = this.refs.userInput.value;
    if(userInput==''||userInput==null){
      return
    }
    let data = {consultId:this.props.id,content:userInput}
    $.post(ASKMDatileUserInput(user.authToken),JSON.stringify(data),(rs)=>{
      $.get(ASKMDatile(1,10,this.props.id,user.authToken),(rs)=>{
        this.refs.userInput.value='';
        this.setState({
          data: rs
        })
      })
    })
  }

  render(){
    let list;
    if(this.state.data!=''){
      list = this.state.data.results.map((o,i)=>(
        <div key={i} className={o.isDoctor?ASKDatileStyle.charGroupDoc:ASKDatileStyle.charGroup}>
          <img src={o.user.iconUrl} height="85" width="85"/>
          <div className={ASKDatileStyle.chatPo}>
            <div className={ASKDatileStyle.name}><span>{o.user.realName}</span><small>{o.datetime}</small></div>
            <div className={ASKDatileStyle.po}>{o.content}</div>
          </div>
        </div>
      ))
    }

    return (
      <div className={ASKDatileStyle.content}>
        <div className={ASKDatileStyle.chat}>
          {list}
        </div>
        <textarea maxLength="250" className={ASKDatileStyle.textAreas} placeholder="请输入回复内容" ref="userInput"></textarea>
        <div className={ASKDatileStyle.btnGroup}>
          <button className={ASKDatileStyle.btn} onClick={()=>this.usreInput()}>回复</button>
          <button className={ASKDatileStyle.btn_back} onClick={()=>{window.history.back()}}>返回</button>
        </div>

      </div>
    )
  }
}

export default ASKM;
