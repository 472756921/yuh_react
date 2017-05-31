/**
 * Created by Benson on 2017/4/25.
 */
import React from 'react';
import ServiceStyle from '../../styles/Service.css';
import AppHead from '../Head/HeadMain';
import {hashHistory} from 'react-router';

class Service extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      index:'安心基础服务',
      list:['安心基础服务','安心精细服务','糖心基础服务','糖心精细服务']
    }
  }

  buy(){
    hashHistory.push({pathname:'/pay',state: {index:this.state.index}})
  }

  render(){
    return (
      <div>
        <AppHead type="ALL"  img={hashHistory.getCurrentLocation().pathname.split('/')[1]} />
        <div  style={{width:'100%',background:'#f5f5f5'}}>
          <div className={ServiceStyle.content}>
            <div className={ServiceStyle.titleNav}>
              <ul>
                {this.state.list.map((o,i)=>(
                  <li key={i} className={this.state.index==o?ServiceStyle.titleNavAcive:''} onClick={()=>{this.setState({...this.state,index:o})}}>{o}</li>
                ))}
              </ul>
            </div>
            <div className={ServiceStyle.textContent}>
              <div className={ServiceStyle.titles}>
                <div className={ServiceStyle.title}>
                  <span>01</span><span>服务启动</span>
                  <ul className={ServiceStyle.textList}>
                    <li><img src={require('images/ICON/service/fuwu_icon1.png')}  />注册您的健康管理专属账号</li>
                    <li><img src={require('images/ICON/service/fuwu_icon2.png')}  />建立您的健康管理个人档案</li>
                    <li><img src={require('images/ICON/service/fuwu_icon3.png')}  />为您配备健康管理医生团队</li>
                    <li><img src={require('images/ICON/service/fuwu_icon4.png')}  />为您的身体进行全面健康检测</li>
                    <li><img src={require('images/ICON/service/fuwu_icon5.png')}  />为您的服务配用专业云血压计</li>
                    <li><img src={require('images/ICON/service/fuwu_icon6.png')}  />为您预约面谈进行健康评估</li>
                    <li><img src={require('images/ICON/service/fuwu_icon7.png')}  />为您提供专业健康评估报告</li>
                    <li><img src={require('images/ICON/service/fuwu_icon8.png')}  />为您定制专属健康管理计划</li>
                  </ul>
                </div>
                <div className={ServiceStyle.title}>
                  <span>02</span><span>定期检测</span>
                  <ul className={ServiceStyle.textList}>
                    <li><img src={require('images/ICON/service/fuwu_icon9.png')}  />每月定期全面健康指标监测</li>
                    <li><img src={require('images/ICON/service/fuwu_icon5.png')}  />用云血压计完成定期指标自测</li>
                    <li><img src={require('images/ICON/service/fuwu_icon10.png')}  />接收健康管理定期随访</li>
                    <li><img src={require('images/ICON/service/fuwu_icon6.png')}  />与您的主管医生定期交流</li>
                    {this.state.index=='安心精细服务'||this.state.index=='糖心精细服务'? <li><img src={require('images/ICON/service/fuwu_icon6.png')}  />您可预约与专家医生面谈</li>:''}
                    <li><img src={require('images/ICON/service/fuwu_icon11.png')}  />APP可查看过往数据</li>
                  </ul>
                </div>
                <div className={ServiceStyle.title}>
                  <span>03</span><span>阶段报告</span>
                  <ul className={ServiceStyle.textList}>
                    <li><img src={require('images/ICON/service/fuwu_icon7.png')}  />健康风险评估报告</li>
                    <li><img src={require('images/ICON/service/fuwu_icon8.png')}  />个人健康管理计划</li>
                    <li><img src={require('images/ICON/service/fuwu_icon7.png')}  />{this.state.index=='安心精细服务'||this.state.index=='糖心精细服务'?'健康管理季度报告':'健康管理半年度报告'}</li>
                    <li><img src={require('images/ICON/service/fuwu_icon7.png')}  />健康管理年度报告</li>
                  </ul>
                </div>
              </div>
              <div style={{padding:'30px 0',color:'#666',borderBottom:'1px solid #eee'}}>
                <span>注：
                  {this.state.index=='安心基础服务'?'此服务包服务于高血压人群':''}
                  {this.state.index=='安心精细服务'?'此服务包服务于高血压高需求人群':''}
                  {this.state.index=='糖心基础服务'?'此服务包服务于糖尿病、高血压与糖尿病双病的人群':''}
                  {this.state.index=='糖心精细服务'?'此服务包服务于糖尿病、高血压与糖尿病双病的高需求人群':''}

                </span>
                <div style={{marginTop:'10px'}}>价格：<span style={{color:'red',fontSize:'20px'}}>￥
                  {this.state.index=='安心基础服务'?'1099':''}
                  {this.state.index=='安心精细服务'?'2699':''}
                  {this.state.index=='糖心基础服务'?'1299':''}
                  {this.state.index=='糖心精细服务'?'2899':''}
                </span></div>
                <button className={[ServiceStyle.btn,'pull-right'].join(' ')} onClick={()=>this.buy()}>立即购买</button>
              </div>

              <div>
                <div className={ServiceStyle.report_Risk_index_A_dish_title}>
                  <span className={ServiceStyle.vertical_bar}></span>会员权益
                </div>
                <ul className={ServiceStyle.textList} style={{padding:'0 30px'}}>
                  <li><img src={require('images/ICON/service/fuwu_icon12.png')}  />您和您的家人都可以随时预约进行全面健康检测</li>
                  <li><img src={require('images/ICON/service/fuwu_icon15.png')}  />您可以预约健康管理师，优医医生团队进行在线互动与健康咨询</li>
                  <li><img src={require('images/ICON/service/fuwu_icon16.png')}  />您可以定期免费参加健康知识讲座，专家义诊活动，健康管理交流活动</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Service;
