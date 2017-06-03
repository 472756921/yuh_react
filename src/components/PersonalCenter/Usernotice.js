/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import PersonalStyle from '../../styles/Personal.css';
import Page from '../Page/Page';
import {Getmessages,GetmessagesByID,redmessages,chakannmmp} from  '../../InterFace/InterfaceAPI';
import DataPushState from '../HealthManage/MyData/DataPreview';

class Usernotice extends React.Component{
  constructor(props) {
    super(props);
    this.pageChange=this.pageChange.bind(this)
    this.state={
      nimmpData:'',
      nimmpDataShow: false,
      no:'',
      pageNow:1,
      message:{
        date:'',
        title:'',
        content:'',
        user:''
      }
    }
  }

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);

    $.get(Getmessages(1,10,1,user.authToken),(rss)=>{
      this.setState({
        no:rss,
      })
    })
  }

  componentDidMount(){
    $('#mainCheck').change((e)=>{
      let boxes = document.getElementsByClassName('checkboxList');
      for(let i=0;i<boxes.length;i++){
          boxes[i].checked = e.target.checked;
      }
    })
    $('#myModal').on('hidden.bs.modal',(e)=>{
      this.setState({
        ...this.state,
        nimmpDataShow: false,
      })
    })
  }

  check(id){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(GetmessagesByID(id,user.authToken,1),(rs)=>{
      this.state.no.results.map((o,i)=>{
        if(id== o.id&& o.isRead==false){
          this.props.noRead('message');
          o.isRead=true
        }
      })
      this.setState({
        ...this.state,
        message:{
          date:rs.updateTime,
          title:rs.title,
          user:rs.publisher,
          content:rs.content,
          messageType: rs.messageType,
          entityId: rs.entityId,
        }
      })
    })
  }
  alread(type,id){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    //   标记已读type=1 和删除type=2,单个删除type=3 传入ID
    let ids = [];
    if(type!=3){
      let ch = $('.checkboxList:checked');
      ch.map((o,i)=>{ids.push(i.getAttribute('data-id'))});
    }else{
      ids.push(id);
      type=2;
    }
    $.post(redmessages(user.authToken),JSON.stringify({ids:ids,operate:type,type:1}),()=>{
      $.get(Getmessages(1,10,1,user.authToken),(rss)=>{
        this.setState({
          no:rss,
        })
        location.reload();
      })
    })
  }

  pageChange(pageNow){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(Getmessages(pageNow,10,1,user.authToken),(rss)=>{
      this.setState({
        pageNow:pageNow,
        no:rss,
      })
    })
  }

  gotodati(id) {
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(chakannmmp(id,user.authToken), (rs) => {
      this.setState({
        ...this.state,
        nimmpData: rs,
        nimmpDataShow: true,
      })
    })
  }

  render(){
    let no,page;
    if(this.state.no.results!=undefined){
      no = this.state.no.results.map((o,i)=>(
        <tr key={i}>
          <td><input type="checkbox" className="checkboxList" data-id={o.id} /></td>
          <td>
            {o.isRead?<span className="glyphicon glyphicon-volume-up" style={{fontSize:'22px',color:'#999'}}></span>:
              <span className="glyphicon glyphicon-volume-up" style={{fontSize:'22px',color:'#000066'}}></span>}
          </td>
          <td style={{cursor:'pointer'}} onClick={()=>this.check(o.id)} data-toggle="modal" data-target="#myModal">{o.title}</td>
          <td>{o.updateTime}</td>
          <td style={{cursor:'pointer'}} onClick={()=>this.alread(3,o.id)}>删除</td>
        </tr>
      ))
      page = {pageNum:this.state.no.pages,total:this.state.no.total,pageNow:this.state.pageNow};
    }
    return(
      <div className={PersonalStyle.infoContent}>
        <div className="modal fade bs-example-modal-lg" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">消息</h4>
              </div>
              <div className="modal-body" style={{overflow:'hidden'}}>
                <div>标题：{this.state.message.title}</div>
                <div>时间：{this.state.message.date}</div>
                <div>发布者：{this.state.message.user}</div>
                <div>内容：<br/>
                  <div style={{padding:'5px',color:'#666'}}>{this.state.message.content}</div>
                </div>
                {this.state.message.messageType==2?<button className='btn btn-danger btn-xs' onClick={()=>this.gotodati(this.state.message.entityId)}>查看详情</button>:''}
                {this.state.nimmpDataShow?<DataPushState data={this.state.nimmpData} json={this.state.nimmpData} back={(status)=>this.back(status)} pos="nmmp"/>:''}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
              </div>
            </div>
          </div>
        </div>


        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;通知消息</h3>

        <div className="btn-group" role="group" aria-label="..." style={{margin:'20px 0'}}>
          <button type="button" className="btn btn-default" onClick={()=>this.alread(2)}><span className="glyphicon glyphicon-trash"></span> 删除</button>
          <button type="button" className="btn btn-default" onClick={()=>this.alread(1)}>标为已读</button>
        </div>

        <table className="table table-hover">
          <tbody>
            <tr className="active" style={{fontSize:'16px'}}>
              <td><input type="checkbox" id="mainCheck"/></td>
              <td><span className="glyphicon glyphicon-volume-up" style={{fontSize:'22px',color:'#999'}}></span></td>
              <td>消息</td>
              <td>时间</td>
              <td>操作</td>
            </tr>
            {no}
          </tbody>
        </table>

        {this.state.no.results!=undefined?<Page data={page}  pageChange={this.pageChange}/>:''}
      </div>
    )
  }
}
export default Usernotice;
