/**
 * Created by Benson on 2017/4/14.
 */
import React from 'react';
import HealthTeamStyle from '../../styles/HealthTeam.css';
import TeamContent from './TeamContent';
import {HealthTeamList} from '../../InterFace/InterfaceAPI';
import Page from '../Page/Page';

class Teams extends React.Component{
  constructor(props){
    super(props);
    this.pageChange=this.pageChange.bind(this)
    this.state={
      data:'',
      page:''
    }
  };

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(HealthTeamList(1,12,user.authToken),(rs)=>{
      this.setState({
        data:rs.results,
        page: {pageNum: rs.pages,total:rs.total,pageNow:1}
      })
    })
  };

  pageChange(pageNow){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(HealthTeamList(pageNow,12,user.authToken),(rs)=>{
      this.setState({
        ...this.state,
        data:rs.results,
        page: {pageNum: rs.pages,total:rs.total,pageNow:pageNow}
      })
    })
  }

  render(){
    let list = <p>暂无数据</p>;
    if(this.state.data!=''){
      list = this.state.data.map((obj,i)=>(
        <TeamContent data={obj} key={i}/>
      ))
    }

    return (
      <div className={HealthTeamStyle.content}>
        <h3 className={HealthTeamStyle.title}><span className={HealthTeamStyle.line}></span>健康团队</h3>
        <div className={HealthTeamStyle.pisCon}>
          {list}
        </div>
        <div className={HealthTeamStyle.clear}></div>
        {this.state.page!=''?<Page data = {this.state.page} type="all" pageChange={this.pageChange}/>:''}
        <div className={HealthTeamStyle.clear}></div>
      </div>
    )
  }
}

export default Teams;
