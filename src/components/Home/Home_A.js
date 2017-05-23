/**
 * Created by Benson on 2017/3/30.
 */
import React from 'react';
import {hashHistory} from 'react-router';
import HomeStyle from '../../styles/home.css';

class Home_A extends React.Component {
  push(position){
    hashHistory.push({pathname:'/HealthManage/'+position})
  }
  render() {
    return (
      <div className={HomeStyle.index_A}>
        <img src={require('images/index/health-management.png')} alt="健康管理"/>
        <div className={HomeStyle.health_managements}>
          <div className={HomeStyle.health_management} onClick={()=>this.push('MyService')}>
            <img src={require('images/index/1.png')}/>
            <div>
              <h4 className={HomeStyle.health_management_title}>我的服务</h4>
              <small className={HomeStyle.health_management_title_small}>my service</small>
            </div>
          </div>
          <div className={HomeStyle.health_management} onClick={()=>this.push('MyReport')}>
            <img src={require('images/index/2.png')}/>
            <div>
              <h4 className={HomeStyle.health_management_title}>我的报告</h4>
              <small className={HomeStyle.health_management_title_small}>my report</small>
            </div>
          </div>
          <div className={HomeStyle.health_management} onClick={()=>this.push('MyData')}>
            <img src={require('images/index/3.png')}/>
            <div>
              <h4 className={HomeStyle.health_management_title}>我的数据</h4>
              <small className={HomeStyle.health_management_title_small}>my data</small>
            </div>
          </div>
          <div className={HomeStyle.health_management} onClick={()=>this.push('MySchedule')}>
            <img src={require('images/index/4.png')}/>
            <div>
              <h4 className={HomeStyle.health_management_title}>我的日程</h4>
              <small className={HomeStyle.health_management_title_small}>my schedule</small>
            </div>
          </div>
          <div className={HomeStyle.clear_me}></div>
        </div>
      </div>
    );
  }
}

export default Home_A;
