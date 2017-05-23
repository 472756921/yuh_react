/**
 * Created by Benson on 2017/3/31.
 */
import React from 'react';
import PageStyle from '../../styles/page.css';

class Page extends React.Component{
  constructor(props){
    super(props);
    let type='nomor';
    if(this.props.type!=undefined){
      type = this.props.type;
    }
    this.state={
      type:type,
      pageNow:1,
      pageNum:this.props.data.pageNum,
      total:this.props.data.total,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      ...this.state,
      pageNum:nextProps.data.pageNum,
      total:nextProps.data.total,
      pageNow:nextProps.data.pageNow
    })
  }
  changePage(i){
    if(i<=0||i>this.state.pageNum){
      return
    }
    this.props.pageChange(i);
    this.setState({
      ...this.state,
      pageNow:i
    })
  }

  render(){
    let li=[];
    for(let i=1;i<=this.state.pageNum;i++){
      if(i==this.state.pageNow)
        li.push(<li key={i} style={{cursor:'pointer'}} className={PageStyle.active}><a onClick={()=>this.changePage(i)}>{i}</a></li>)
      else
        li.push(<li key={i} style={{cursor:'pointer'}}><a onClick={()=>this.changePage(i)}>{i}</a></li>)
    }

    return(
      <nav aria-label="Page navigation">
        <ul className="pagination pull-right">
          {this.state.type=='all'?<li>
            <a style={{cursor:'pointer'}} aria-label="Previous" onClick={()=>this.changePage(1)}>
              <span aria-hidden="true">首页</span>
            </a>
          </li>:''}
          <li>
            <a style={{cursor:'pointer'}} aria-label="Previous" onClick={()=>this.changePage(this.state.pageNow-1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {li}
          <li>
            <a style={{cursor:'pointer'}} aria-label="Next" onClick={()=>this.changePage(this.state.pageNow+1)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          {this.state.type=='all'?<li>
            <a style={{cursor:'pointer'}} aria-label="Previous" onClick={()=>this.changePage(this.state.pageNum)}>
              <span aria-hidden="true">末页</span>
            </a>
          </li>:''}
        </ul>
      </nav>
    )
  }
}
export default Page;
