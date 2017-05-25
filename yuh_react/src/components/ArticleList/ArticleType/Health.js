/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import RiskStyle from '../../../styles/Risk.css';
import {ARTICLEDETAILS} from '../../../InterFace/InterfaceAPI';

class Health extends React.Component{
  constructor(props) {
    super(props);
  }
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
          <div className="pull-left">主管医生：</div>
          <div  className="pull-left">{this.props.data.data.attendingDoctor}</div>
        </div>
        <div>
          <div className="pull-left">录入人：</div>
          <div  className="pull-left">{this.props.data.data.doctorName}</div>
        </div>
        <div>
          <div className="pull-left">用户姓名：</div>
          <div  className="pull-left">{this.props.data.data.customerName}</div>
        </div>
        <div>
          <div className="pull-left">录入日期：</div>
          <div  className="pull-left">{this.props.data.data.createTime}</div>
        </div>
        <div>
          <div className="pull-left">血压管理建议：</div>
          <div  className="pull-left">{this.props.data.data.personalHealthManagementTemplateJson.bloodPressureManagementAdvice}</div>
        </div>
        <div style={{clean:'both'}}></div>
        <div>
          <div className="pull-left">血糖管理建议：</div>
          <div  className="pull-left">{this.props.data.data.personalHealthManagementTemplateJson.bloodSugarManagementAdvice}</div>
        </div>
        <div style={{clean:'both'}}></div>
        <div>
          <div className="pull-left">常规观察结果及建议：</div>
          <div  className="pull-left">{this.props.data.data.personalHealthManagementTemplateJson.resultsAndSuggestions}</div>
        </div>
        <div style={{clean:'both'}}></div>
        <div>
          <div className="pull-left">诊疗方案建议：</div>
          <div  className="pull-left">{this.props.data.data.personalHealthManagementTemplateJson.medicalAdvice}</div>
        </div>
        <div style={{clean:'both'}}></div>
        <div>
          <div className="pull-left">饮食建议及禁忌提醒：</div>
          <div  className="pull-left">{this.props.data.data.personalHealthManagementTemplateJson.dietaryAdviceToRemindAndTaboos}</div>
        </div>
        <div style={{clean:'both'}}></div>
        <div>
          <div className="pull-left">运动建议：</div>
          <div  className="pull-left">{this.props.data.data.personalHealthManagementTemplateJson.exerciseAdvice}</div>
        </div>
        <div style={{clean:'both'}}></div>
        <div>
          <div className="pull-left">个人习惯建议：</div>
          <div  className="pull-left">{this.props.data.data.personalHealthManagementTemplateJson.personalHabitsSuggest}</div>
        </div>
      </div>
    )
  }
}
export default Health;
