/**
 * Created by Benson on 2017/4/1.
 */
import React from 'react';
import TimeLineStyle from '../../../styles/tiemLineStyles.css';
import ServiceContent from './ServiceContent';
import {GetService} from '../../../InterFace/InterfaceAPI';

let index=0;

class DateLine extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:this.props.data
    }
  };
  nextShow(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(GetService(1,user.authToken),(rs)=>{
      let newData =  {date:rs["0"].executeBegin,content:rs['0'].entryName[0].name,next:true};
      this.setState({
        data: [newData, ...this.state.data]
      })
    })

  };
  render(){
    let data = this.state.data.map((d,i)=>{
      if(d.isYear){
        return (
          <li className={TimeLineStyle.timeline_inverted} key={i}>
            <div className={TimeLineStyle.tl_circ2}></div>
            <div className={TimeLineStyle.timeline_panel2}>
              <h2 style={{lineHeight:'26px'}} id={d.year}>
                <b>{d.year}</b>
              </h2>
            </div>
          </li>
        )
      }
      else {
        index+=1;
        if(index%2==0){
          if(d.next){
            return (<div key={i}><ServiceContent content={d.content} date={d.date} position="next"/></div>)
          }else{
            return (<div key={i}><ServiceContent content={d.content} date={d.date} position="left"/></div>)
          }
        }else{
          if(d.next){
            return (<div key={i}><ServiceContent content={d.content} date={d.date} position="next"/></div>)
          }else{
            return (<div key={i}><ServiceContent content={d.content} date={d.date} position=""/></div>)
          }
        }
      }
    })

    if(data.length==0){
      data = <div><ServiceContent content='暂无数据' date='暂无数据' position=""/></div>
    }

    return(
      <span>
      <ul className={TimeLineStyle.timeline} id="asc">
        {data}
      </ul>
        </span>
    )
  }
}

export default DateLine;
