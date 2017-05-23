/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import Start from '../Star';
import {DocDatile,DocDatileComments} from '../../InterFace/InterfaceAPI';

class DocShow extends React.Component{
  constructor(props){
    super(props);
    this.state={
      doc:'',
      comments: ''
    }
  }

  datile(id){
    let star = this.refs.star;
    let comm = this.refs.comm;
    if(star.style.display!='none'&&comm.style.display!='none'){
      comm.style.display='none';
      star.style.display='none';
      return
    }

    $.get(DocDatile(id),(rs)=>{
      this.setState({
        doc:rs
      })
      star.style.display='block';
    })
    $.get(DocDatileComments(id),(rs)=>{
      this.setState({
        comments:rs.results
      })
      comm.style.display='block';
    })
  }

  render(){
    let comm=<p>暂无评价</p>;
    if(this.state.comments!=''){
      comm=this.state.comments.map((obj,i)=>(
        <div key={i} style={{margin:'30px 0',padding:'10px 0',overflow:'auto'}}>
          <img src={obj.icon}  width="84" height="84" style={{border:'1px solid #e3e3fa'}} className="img-circle"/>
          <div style={{float:'right',width:'800px'}}>
            <span  ref="star"  style={{float:'left'}}>评价等级：<Start star={obj.star} /></span>
            <span style={{width:'98%',float:'left',marginLeft:'10px',color:'#666',marginTop:'10px'}}>{obj.comment}</span>
            <span style={{textAlign:'right',float:'right',color:'#999'}}>{obj.date}</span>
          </div>
        </div>
      ))
    }
    return (
      <div style={{margin:'30px 0',padding:'10px 0',overflow:'auto'}}>
        <img src={this.props.data.icon}  width="84" height="84" style={{border:'1px solid #e3e3fa'}} className="img-circle"/>
        <div style={{float:'right',width:'900px'}}>
          <span style={{fontSize:'18px',marginLeft:'10px',cursor:'pointer'}} onClick={()=>this.datile(this.props.data.id)}>{this.props.data.name}{this.props.data.realName}</span>
          {this.props.userType!='management'?<span  ref="star"  style={{float:'right',display:'none'}}>综合评价等级：<Start star={this.state.doc.star}/></span>:''}
          <span style={{width:'98%',float:'left',marginLeft:'10px',color:'#666',marginTop:'10px'}}>{this.props.data.info}</span>
          {this.props.data.phoneNumber!=undefined?<div style={{marginLeft:'10px',color:"#aaa"}}>电话号码：{this.props.data.phoneNumber}</div>:''}
        </div>
        <div style={{width:'900px',marginTop:'30px',float:'right',display:'none'}} ref="comm">
          <div style={{marginLeft:'10px',color:"#666"}}>本月咨询数：{this.state.doc.currentNum}次  咨询总数：{this.state.doc.totalNum}次</div>
          <h4 style={{color:'#999',fontSize:'16px'}}><span style={{borderLeft:'4px solid #e3e3fa',marginRight:'10px'}}></span>患者评语</h4>
          {comm}
        </div>
      </div>
    )
  }
}
export default DocShow;
