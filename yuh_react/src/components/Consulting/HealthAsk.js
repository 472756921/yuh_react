/**
 * Created by Benson on 2017/4/12.
 */
import React from 'react';
import ConsultingStyle from '../../styles/Consulting.css';
import AskM from './AskM';
import AskDoc from './AskDoc';
import AskDatile from './AskDatile';
import { hashHistory } from 'react-router';

class HealthManagementDivision extends React.Component{
  constructor(props) {
    super(props);
    let style=this.props.location.pathname.split('/')[2];
    switch (style){
      case 'HMD':
        this.state={
          title: '问健管师',
          inner: <AskM />
        }
        break;
      case 'HMDUC':
        this.state={
          title: '问医生',
          inner: <AskDoc />
        }
        break;
    }
  }

  render(){
    return (
      <div className={ConsultingStyle.content}>
        <h3 className={ConsultingStyle.title}>
          <span className={ConsultingStyle.line}></span>
          {this.state.title}
          <small style={{color:'red'}}>&nbsp; 免费咨询次数剩余10次</small>
        </h3>

        {this.state.inner}

        <AskDatile/>

        <div style={{clear:'both'}}></div>

      </div>
      )
  }
}

export default HealthManagementDivision;
