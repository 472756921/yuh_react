/**
 * Created by Benson on 2017/5/3.
 */
import React from 'react';
import CerebralStrokeMainStyle from '../../../styles/CerebralStroke.css';
import {CerebralSList} from '../../../InterFace/InterfaceAPI';
import Page from '../../Page/Page';
import {Link} from 'react-router';

class CerebralStrokeMain extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:[],
      pageNow:1,
      total:1,
      pages:1
    }
  }
  componentWillMount(){
    this.getTheList(1);
  }

  getTheList(page){
    let userinfo = sessionStorage.getItem('userData');
    userinfo = JSON.parse(userinfo);

    $.get(CerebralSList(userinfo.id,page,10,userinfo.authToken),(rs)=>{
      this.setState({
        data:rs.results,
        total:rs.total,
        pages:rs.pages
      })
    })
  }

  pageChange(page){
    this.getTheList(page);
  }

  render(){
    let list;
    if(this.state.data!=null&&this.state.data!=undefined){
      list = this.state.data.map((o,i)=>(
        <tr key={i}>
          <td>{o.title}</td>
          <td>{o.startDate}~{o.endDate}</td>
          <td><Link to={{ pathname: '/Article/11/'+o.id}}>查看详情</Link></td>
        </tr>
      ))
    }

    return (
      <div className={CerebralStrokeMainStyle.content}>
        <h3 className={CerebralStrokeMainStyle.title}><span className={CerebralStrokeMainStyle.line}></span>脑卒中随访</h3>
        <br/>
        <table className="table table-bordered">
          <thead>
            <tr  className="active">
              <td>报告标题</td>
              <td>报告周期</td>
              <td>查看详细</td>
            </tr>
          </thead>
          <tbody>
          {list}
          </tbody>
        </table>
        <Page data={{pageNum:this.state.pages,total:this.state.total}}  pageChange={(pageNow)=>this.pageChange(pageNow)}/>
        <div className={CerebralStrokeMainStyle.clear}></div>
      </div>
    )
  }
}

export default CerebralStrokeMain;
