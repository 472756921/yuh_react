/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import RiskStyle from '../../../styles/Risk.css';
import {UserTopThreeFUList} from '../../../InterFace/InterfaceAPI';
import Page from '../../Page/Page';

let user;
class TopThreeFU extends React.Component{
  constructor(props) {
    super(props);
    let userinfo = sessionStorage.getItem('userData');
    user = JSON.parse(userinfo);
    this.state={
      pageNow:1,
      pages:1,
      data:'',
      list:[],
      total:0,
    };
  }

  componentDidMount(){
    this.getList(this.state.pageNow);
  }

  getList(page){
    $.get(UserTopThreeFUList(page,user.authToken),(rs)=>{
      this.setState({
        data: rs.results[0],
        list: rs.results[0].itemJsons,
        pages: rs.pages,
        pageNow: page,
        total: rs.total
      })
    })
  }

  getStatus(status){
    switch (status){
      case 'PAID':
        status='已支付';
        break;
      case 'UNPAID':
        status='未支付';
        break;
      case 'INVALID':
        status='已失效';
        break;
    }
    return status;
  }
  getStatusList(status){
    switch (status){
      case 'CONFIGURED':
        status='已配置';
        break;
      case 'UNDONE':
        status='未完成';
        break;
      case 'DONE':
        status='已完成';
      case 'POSTPONING':
        status='待延期';
      case 'POSTPONEMENT':
        status='已延期';
      case 'INVALID':
        status='已失效';
        break;
    }
    return status;
  }

  pageChange(page){
    this.getList(page);
  }

  render(){
    let list;
    if(this.state.list!=null&&this.state.list!=undefined){
      list = this.state.list.map((o,i)=>{
        return (
          <tr key={i}>
            <td>{o.time}</td>
            <td>{o.eventName}</td>
            <td>{this.getStatusList(o.status)}</td>
          </tr>
        )
      })
    }

    return(
      <div className={RiskStyle.report_Risk_index_A_dish}>
        <div>
          <div className="pull-left">姓名：</div>
          <div  className="pull-left" style={{color:'#888',padding:'10px'}}>{this.state.data.userName}</div>
        </div>
        <div>
          <div className="pull-left">方案名：</div>
          <div  className="pull-left" style={{color:'#888',padding:'10px'}}>{this.state.data.planName}</div>
        </div>
        <div>
          <div className="pull-left">服务开始时间：</div>
          <div  className="pull-left" style={{color:'#888',padding:'10px'}}>{this.state.data.serviceStartTime}</div>
        </div>
        <div>
          <div className="pull-left">方案状态：</div>
          <div  className="pull-left" style={{color:'#888',padding:'10px'}}>{this.getStatus(this.state.data.status)}</div>
        </div>
        <div>
          <div className="pull-left">总金额：</div>
          <div  className="pull-left" style={{color:'red',padding:'10px'}}>￥{this.state.data.allPrice}</div>
        </div>
        <br/>
        <table className="table table-hover  table-bordered" >
          <thead>
            <tr className="active">
              <td>日期</td>
              <td>事件</td>
              <td>状态</td>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
        <Page data={{pageNum:this.state.pages,total:this.state.total,pageNow:this.state.pageNow}}  pageChange={(pageNow)=>this.pageChange(pageNow)}/>
      </div>
    )
  }
}
export default TopThreeFU;
