/**
 * Created by Benson on 2017/4/12.
 */
import React from 'react';
import MyScheduleStyle from '../../../styles/MySchedule.css';
import {GETDateEvent,EditDateEvent,GETDateEventDatile,DelDateEvent,NewDateEvent} from '../../../InterFace/InterfaceAPI';

class ScheduleMain extends React.Component{
  constructor(props) {
    super(props);
  };
  componentDidMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);

    scheduler.config.xml_date="%Y-%m-%d %H:%i";
    scheduler.init('scheduler_here',new Date(),"month");

    let date = new Date();

    let sdate = new Date(date.valueOf()-24*60*60*1000*100);
    let edate = new Date(date.valueOf()+24*60*60*1000*100);
    sdate = sdate.getFullYear()+"-"+(sdate.getMonth()+1)+"-"+sdate.getDate();
    edate = edate.getFullYear()+"-"+(edate.getMonth()+1)+"-"+edate.getDate();
    //禁止拖动
    scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
      return false;
    });
    //删除
    scheduler.attachEvent("onBeforeEventDelete", function(id,e){
      if(e.type=='3'){
        $.get(DelDateEvent(user.authToken, e.id),(rs)=>{
        })
        return true;
      }else{
        alert('对不起，您无权删除该日程');
        return false;
      }
    });
    //修改
    scheduler.attachEvent("onEventChanged", function(id,ev){
      if(ev.type==3){
        let content = ev.text
        let date = ev.end_date
        date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        let json = {
          content:content,
          date:date,
          id:id
        }

        $.get(EditDateEvent(user.authToken),JSON.stringify(json),(rs)=>{
          return true;
        })
        return false
      }else{
        alert('对不起，您无权修改该日程');
        return false
      }
    });
    //新建
    scheduler.attachEvent("onEventAdded", function(id,ev){
      //any custom logic here
      ev.type=3;
      let date = ev.start_date;
      date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
      let json={
        content:ev.text,
        scheduleDate:date
      }
      $.post(NewDateEvent(user.authToken),JSON.stringify(json),(rs)=>{})
      return false;
    });

    let eve=[];
    $.get(GETDateEvent(user.authToken,edate,sdate),(rs)=>{
      rs.map((o,index)=>{
        if(o.type.length!=0){
          $.get(GETDateEventDatile(user.authToken, o.day),(rss)=>{
            rss.selfCreate.map((obj,i)=>{
              //用户自建
              eve.push({id:obj.id,text:'自建日程: '+testcf('自建日程: ',obj.content),start_date:obj.date,end_date:obj.date,type:3})
            })
            rss.strokes.map((obj,i)=>{
              //脑中猝
              eve.push({id:obj.id,text:'脑中猝随访：'+testcf('脑中猝随访：',obj.content),start_date:obj.date,end_date:obj.date,type:5})
            })
            rss.exclusiveConsult.map((obj,i)=>{
              //专属预约
              eve.push({id:obj.id,text:'专属预约：'+testcf('专属预约：',obj.content),start_date:obj.date,end_date:obj.date,type:1})
            })
            rss.medicalConsult.map((obj,i)=>{
              //医师互动
              eve.push({id:obj.id,text:'医师互动：'+testcf('医师互动：',obj.content),start_date:obj.date,end_date:obj.date,type:2})
            })
            scheduler.parse(eve, "json");
          })
          let text='自建日程';
        }
      })

      function testcf(name,orText){
        let text;
        if(orText.indexOf(name)>-1){
          text = orText.split(' ')[1];
        }else{
          text = orText;
        }
        return text;
      }

    })

  }

  render(){

    return(
      <div className={MyScheduleStyle.content}>
        <h3 className={MyScheduleStyle.title}><span className={MyScheduleStyle.line}></span>我的日程</h3>
        <div id="scheduler_here" className="dhx_cal_container" style={{width:'100%',height:'800px',margin:'10px 0 50px'}}>
          <div className="dhx_cal_navline">
            <div className="dhx_cal_prev_button">&nbsp;</div>
            <div className="dhx_cal_next_button">&nbsp;</div>
            <div className="dhx_cal_today_button"></div>
            <div className="dhx_cal_date"></div>
            <div className="dhx_cal_tab" name="day_tab" style={{right:'204px'}}></div>
            <div className="dhx_cal_tab" name="week_tab" style={{right:"140px"}}></div>
            <div className="dhx_cal_tab" name="month_tab" style={{right:'76px'}}></div>
          </div>
          <div className="dhx_cal_header">
          </div>
          <div className="dhx_cal_data">
          </div>
        </div>
      </div>
    )
  }
}
export default ScheduleMain;
