/**
 * Created by Benson on 2017/4/13.
 */
import React from 'react';
import AskDatileStyle from '../../styles/AskDatile.css';
import {ASKMList,ASKDOCList,ASKMListMy} from '../../InterFace/InterfaceAPI';
import {hashHistory} from 'react-router';
import Page from '../Page/Page';

class AskDatile extends React.Component{

  constructor(props){
    super(props);
    this.pageChange=this.pageChange.bind(this)
    this.state={
      active:'all',
      data:[],
      page:'',
      p:{now:1,size:10}
    }
  }

  updata(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    if(this.props.title=='ASKM'){
      $.get(ASKMList(1,10,user.authToken),function(rs){
        this.setState({
          data: rs.results,
          page: {pageNum: rs.pages,total:rs.total,pageNow:1}
        })
      }.bind(this))
    }else{
      $.get(ASKDOCList(1,10,user.authToken),function(rs){
        this.setState({
          data: rs.results,
          page: {pageNum: rs.pages,total:rs.total,pageNow:1}
        })
      }.bind(this))
    }
  }

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    if(this.props.title=='ASKM'){
      $.get(ASKMList(1,10,user.authToken),function(rs){
        this.setState({
          data: rs.results,
          page: {pageNum: rs.pages,total:rs.total,pageNow:1}
        })
      }.bind(this))
    }else{
      $.get(ASKDOCList(1,10,user.authToken),function(rs){
        this.setState({
          data: rs.results,
          page: {pageNum: rs.pages,total:rs.total,pageNow:1}
        })
      }.bind(this))
    }
  }

  push(id,i){
      hashHistory.push({pathname:'/Article/'+i+'/'+id,state: {id:id}})
  };

  pageChange(pageNow){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    if(this.props.title=='ASKM'){
      if(this.state.active=='all'){
        this.getAllList(pageNow,user);
      }else{
        this.getMyList(pageNow,user);
      }

    }else{
      $.get(ASKDOCList(pageNow,10,user.authToken),function(rs){
        this.setState({
          ...this.state,
          data: rs.results,
          page: {pageNum: rs.pages,total:rs.total,pageNow:pageNow}
        })
      }.bind(this))
    }
  }
  change(pageNow,type) {
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    if(type=='all'){
      this.getAllList(pageNow,user)
    }else{
      this.getMyList(pageNow,user);
    }
  }
  getMyList(pageNow,user){
    $.get(ASKMListMy(pageNow, 10, user.authToken), (rs)=> {
      this.setState({
        ...this.state,
        active: 'my',
        data:rs.results,
        page: {pageNum: rs.pages,total:rs.total,pageNow:pageNow}
      });
    })
  }
  getAllList(pageNow,user){
    $.get(ASKMList(pageNow,10,user.authToken), (rs)=> {
      this.setState({
        ...this.state,
        active: 'all',
        data:rs.results,
        page: {pageNum: rs.pages,total:rs.total,pageNow:pageNow}
      });
    })
  }


  render(){
    let data=<div>暂无数据</div>;
    if(this.state.data.length>0&&this.props.title=='ASKM'){
      data = this.state.data.map((obj,i)=>(
        <div key={i} className={AskDatileStyle.group} onClick={()=>this.push(obj.id,'6')}>
          <img src={obj.customer.iconUrl}/>
          <div className={AskDatileStyle.datile}>
            <h4>{obj.content}</h4>
            <div>
              <div className="pull-left">{obj.customer.realName}</div>
              <div className="pull-right">{obj.lastUpdateTime}</div>
            </div>
          </div>
        </div>
      ))
    }
    if(this.state.data.length>0&&this.props.title=='ASKDOC'){
      data = this.state.data.map((obj,i)=>{
        let status;
        switch (obj.status){
          case 1:
            status= '已提交';
            break;
          case 2:
            status= '返回患者，补充报告';
            break;
          case 3:
            if(obj.isDiscuss)
              status= '医生提交到讨论组';
            else
              status= '医生正在处理';

            break;
          case 4:
            if(obj.isCommented)
              status= '已评论';
            else
              status= '医生已处理';
            break;
        }
        return(
          <div className={AskDatileStyle.group} key={i} onClick={()=>this.push(obj.id,'7')}>
            <img src={obj.icon}/>
            <div className={AskDatileStyle.datile}>
              <h4>{obj.desc}</h4>
              <div>
                <div className="pull-left">{status}</div>
                <div className="pull-right">{obj.updateTime}</div>
              </div>
            </div>
          </div>
        )
      }
      )
    }


    return (
      <div className={AskDatileStyle.content}>
        <h4>咨询记录</h4>
        {data}
        {this.props.title=='ASKM'?
        <div className="btn-group" role="group" style={{margin:'20px 0 0 0',float:'left'}}>
          <button type="button" onClick={()=>this.change(1,'all')} className={["btn",'btn-default',this.state.active=='all'?'active':''].join(' ')}>全部</button>
          <button type="button" onClick={()=>this.change(1,'my')} className={["btn",'btn-default',this.state.active=='my'?'active':''].join(' ')}>我的</button>
        </div> :''}
        {this.state.page!=''?<Page data = {this.state.page} pageChange={this.pageChange}/>:''}

      </div>
    )
  }
}

export default AskDatile;
