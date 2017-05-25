/**
 * Created by Benson on 2017/3/30.
 */
import React from 'react';
import HeadStyle from '../../styles/header.css';

class appHead_C extends React.Component {
  render() {
    let img =  require('images/banner/bannerHome.png');
    let position = this.props.img;
    switch (position){
      case 'home':
        img =  require('images/banner/bannerHome.png');
        break;
      case 'MyService':
        img =  require('images/banner/bannerMyservice.png');
        break;
      case 'MyReport':
        img =  require('images/banner/bannerMyReport.png');
        break;
      case 'MyData':
        img =  require('images/banner/bannerMyReport.png');
        break;
      case 'MySchedule':
        img =  require('images/banner/bannerMyservice.png');
        break;
      case 'HMD':
        img =  require('images/banner/bannerMyservice.png');
        break;
      case 'HMDUC':
        img =  require('images/banner/bannerMyservice.png');
        break;
      case 'Teams':
        img =  require('images/banner/bannerTeam.png');
        break;
      case 'service':
        img =  require('images/banner/Service.png');
        break;
      case 'CerebralStrokeMain':
        img =  require('images/banner/bannerMyReport.png');
        break;
    }
    return (
      <div className={HeadStyle.banner}>
        <a href="#service">
          <img src={img} alt="点击跳转到服务包介绍页面" title="点击跳转到服务包介绍页面" />
        </a>
      </div>
    );
  }
}
export default appHead_C;
