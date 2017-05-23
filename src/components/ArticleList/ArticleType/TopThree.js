/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import RiskStyle from '../../../styles/Risk.css';
import {UserTopThreeDatile} from '../../../InterFace/InterfaceAPI';

let user;
class TopThree extends React.Component{
  constructor(props) {
    super(props);
    let userinfo = sessionStorage.getItem('userData');
    user = JSON.parse(userinfo);
    this.state={
      data:''
    };
  }

  componentDidMount(){
    let id=this.props.data.id;
    $.get(UserTopThreeDatile(id,user.authToken),(rs)=>{
      this.setState({
        data: rs
      })
    })
  }

  render(){
    let bd;
    let bs;
    return(
      <div className={RiskStyle.report_Risk_index_A_dish}>
        <div>
          <div className="pull-left">录入日期：</div>
          <div  className="pull-left">{this.props.data.data.createTime}</div>
        </div>
        <div>
          <div className="pull-left">录入人：</div>
          <div  className="pull-left">{this.props.data.data.doctorName}</div>
        </div>
        <div>
          <div className="pull-left">主管医生：</div>
          <div  className="pull-left">{this.props.data.doc}</div>
        </div>
        <div>
          <div className="pull-left">用户姓名：</div>
          <div  className="pull-left">{this.state.data.customerName}</div>
        </div>
        <div>
          <div className="pull-left">服药注意事项：</div>
          <br/>
          <div  className="pull-left" style={{color:'#888',padding:'10px'}}>{this.state.data.medicationAttention}</div>
        </div>
        <div>
          <div className="pull-left">营养指导：</div>
          <br/>
          <div  className="pull-left" style={{color:'#888',padding:'10px'}}>{this.state.data.nutritionGuidance}</div>
        </div>
        <div>
          <div className="pull-left">休息与运动指导：</div>
          <br/>
          <div  className="pull-left" style={{color:'#888',padding:'10px'}}>{this.state.data.restAndExerciseGuidance}</div>
        </div>
        <div>
          <div className="pull-left">生活工作中注意事项：</div>
          <br/>
          <div  className="pull-left" style={{color:'#888',padding:'10px'}}>{this.state.data.lifeInAttentions}</div>
        </div>
        <div>
          <div className="pull-left">术后康复歌：</div>
          <br/>
          <div  className="pull-left" style={{color:'#888'}}>清淡饮食    低盐低脂    控制体重    适度运动    戒烟限酒    注意保暖    避免受凉

            控制情绪    心态平和    愉悦生活    睡眠充足    遵嘱服药    定期复查    不适随诊</div>
        </div>
      </div>
    )
  }
}
export default TopThree;
