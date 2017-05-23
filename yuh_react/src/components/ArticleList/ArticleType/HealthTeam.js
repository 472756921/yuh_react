/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import HTStyle from '../../../styles/HealthTeamDatile.css';
import {HealthTeamGroup,HealthTeamDoc} from '../../../InterFace/InterfaceAPI';
import DocShow from '../../HealthTeam/DocShow';
import Start from '../../Star';


class HealthTeam extends React.Component{
  constructor(props){
    super(props);
    this.state={
      group:'',
      doc:''
    }
  };

  componentWillMount(){
    $.get(HealthTeamGroup(this.props.id),(rs)=>{
      this.setState({
        group: rs
      })
    })
    $.get(HealthTeamDoc(this.props.id),(rs)=>{
      this.setState({
        doc: rs
      })
    })
  }

  render(){
    let doc=[];
    let zsDoc=[];
    if(this.state.doc!=''){
      this.state.doc.map((obj,i)=>{
        if(obj.type==1){
          doc.push(<DocShow data={obj} key={i}/>) ;
        }
        if(obj.type==2){
          zsDoc.push(<DocShow data={obj} key={i}/>) ;
        }
      })
    }
    return (
      <div className={HTStyle.content}>
        <div className={HTStyle.textContent}>
          <div className={HTStyle.text}>
            <h3 style={{color:'#333'}}>{this.state.group.name}</h3>
            <div>{this.state.group.info}</div>
            <div className={HTStyle.textTitle}>
              综合评价等级 : <Start star={this.state.group.star}/>
            </div>
            <div className={HTStyle.textTitle}>本月咨询次数 : {this.state.group.currentNum}</div>
            <div className={HTStyle.textTitle}>历史咨询总数 : {this.state.group.totalNum}</div>
          </div>
          <img src={this.state.group.logo} className={HTStyle.logo}/>
        </div>
        <div className={HTStyle.clear}></div>

        <div className={HTStyle.docTeam}>
          <h3 className={HTStyle.my_service_title}><span className={HTStyle.line}></span>健康管理师</h3>
          {this.state.group!=''? <DocShow data={this.state.group.assistant} userType="management"/>:''}
          <h3 className={HTStyle.my_service_title}><span className={HTStyle.line}></span>主管医生</h3>
          {doc}
          <h3 className={HTStyle.my_service_title}><span className={HTStyle.line}></span>资深专家</h3>
          {zsDoc}

        </div>
      </div>
    )
  }
}

export default HealthTeam;
