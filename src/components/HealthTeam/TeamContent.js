/**
 * Created by Benson on 2017/4/14.
 */
import React from 'react';
import TeamStyle from '../../styles/TemaContent.css';
import {hashHistory} from 'react-router';

class TeamContent extends React.Component{
  constructor(props){
    super(props);
  };

  push(id){
    hashHistory.push({pathname:'/Article/8/'+id,state: {id:id}})
  }

  render(){
    return(
      <div className={TeamStyle.content}>
        {this.props.data.isMy==1?<img src={require('images/ICON/my_team.png')} className={TeamStyle.MyTeam}/>:''}
        <img src={this.props.data.logo} />
        <div className={TeamStyle.textShow} >
          <h4>{this.props.data.name}</h4>
          <div className={TeamStyle.teamCon}>
            <div>{this.props.data.info}</div>
            <br/>
            <button onClick={()=>this.push(this.props.data.id)} className={[TeamStyle.btn,'center-block'].join(' ')}>查看详情</button>
          </div>
        </div>
      </div>
    )
  }
}

export default TeamContent;
