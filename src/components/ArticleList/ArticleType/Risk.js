/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import RiskStyle from '../../../styles/Risk.css';
import {ARTICLEDETAILS} from '../../../InterFace/InterfaceAPI';

class Risk extends React.Component{
  constructor(props) {
    super(props);
  }
  createMarkup() { return {__html: this.state.content}; };
  render(){
    let bd;
    let bs;
    switch (this.props.data.data.bloodPressureConditions){
      case 1:
        bd='良好';
        break;
      case 2:
        bd='一般';
        break;
      case 3:
        bd='较差';
        break;
    }
    switch (this.props.data.data.bloodSugarConditions){
      case 1:
        bs='良好';
        break;
      case 2:
        bs='一般';
        break;
      case 3:
        bs='较差';
        break;
    }

    return(
      <div className={RiskStyle.report_Risk_index_A_dish}>
        <div>
          <div className="pull-left">录入日期：</div>
          <div  className="pull-left">{this.props.data.data.createTime}</div>
        </div>
        <div>
          <div className="pull-left">录入人：</div>
          <div  className="pull-left">{this.props.data.data.doc_name}</div>
        </div>
        <div>
          <div className="pull-left">主管医生：</div>
          <div  className="pull-left">{this.props.data.doc}</div>
        </div>
        <div>
          <div className="pull-left">您的血压状况：</div>
          <div  className="pull-left">{bd}</div>
        </div>
        <div>
          <div className="pull-left">您的血糖状况：</div>
          <div  className="pull-left">{bd}</div>
        </div>
        <div>
          <div className="pull-left">健康管理建议：</div>
          <div  className="pull-left">{this.props.data.data.advice}</div>
        </div>
      </div>
    )
  }
}
export default Risk;
