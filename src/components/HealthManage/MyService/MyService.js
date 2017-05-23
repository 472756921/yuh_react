/**
 * Created by Benson on 2017/4/1.
 */
import React from 'react';
import AppHead from '../../Head/HeadMain';
import MyServiceStyle from '../../../styles/MyService.css';
import GetLine from './MyServiceData';
import YearLine from './YearsLine';
import DateLind from './DateLine';

class MyService extends React.Component{
  constructor(props) {
    super(props);
    this.state={name:'预知下次服务',data:GetLine().getDatasForView(),year: GetLine().getYears()}
  };
  nextService(){
    this.refs.DataL.nextShow();
    this.setState({name:' '})
  };
  render(){
    return(
      <div className={MyServiceStyle.my_service}>
        <h3 className={MyServiceStyle.my_service_title}><span className={MyServiceStyle.line}></span>我的服务</h3>
        <div className={[MyServiceStyle.times,'pull-left'].join(" ")}>
          <div className={MyServiceStyle.time_line_left} id="time_line_left">
            <div className={[MyServiceStyle.start,MyServiceStyle.circle].join(" ")}></div>
            <div className={[MyServiceStyle.end, MyServiceStyle.circle].join(" ")}></div>
          </div>
          {this.state.year==undefined?'':<YearLine years={this.state.year}/>}
        </div>
        <div className={['pull-right', MyServiceStyle.time_contents].join(' ')}>
          <h5 className={MyServiceStyle.next_server} ref="next_server" onClick={()=>this.nextService()}>
            {this.state.name}
          </h5>
          <div className={MyServiceStyle.time_content}>
            <div className={MyServiceStyle.time_content_2}>
              {this.state.data==undefined?'':<DateLind data={this.state.data}  ref="DataL"/>}
            </div>
          </div>
        </div>
        <div className={MyServiceStyle.clear_me}></div>
      </div>
    )
  }
}

export default MyService;
