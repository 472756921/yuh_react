import React from 'react';

import Footer from './Footer';
import Asides from './Aside';
import { Router, Route, hashHistory,IndexRoute } from 'react-router';

import Home from './Home/HomeMain';
import Articles from './ArticleList/ArticleContent';
import ArticleDetails from './ArticleList/ArticleDetails';
import HealthManage from './HealthManage/HealthManageMain';
import MyService from './HealthManage/MyService/MyService';
import MyReport from './HealthManage/MyReport/MyReport';
import MyData from './HealthManage/MyData/MyData';
import ScheduleMain from './HealthManage/MySchedule/ScheduleMain';
import ConsultingMain from './Consulting/ConsultingMain';
import AskM from './Consulting/AskM';
import AskDoc from './Consulting/AskDoc';
import HealthTeam from './HealthTeam/HealthTeam';
import Teams from './HealthTeam/Teams';
import PersonalMain from './PersonalCenter/PersonalMain';
import UserData from './PersonalCenter/UserData';
import UserBaseData from './PersonalCenter/UserBaseData';
import ChangePWD from './PersonalCenter/UserChangePWD';
import UserMedicalEvent from './PersonalCenter/UserMedicalEvent';
import UserMedicalHistory from './PersonalCenter/UserMedicalHistory';
import UserDrugSituation from './PersonalCenter/UserDrugSituation';
import Usernotice from './PersonalCenter/Usernotice';
import UserAnnounce from './PersonalCenter/UserAnnounce';
import Login from './Login';
import ForgetPWD from './ForgetPWD';
import Service from './UService/Service';
import Pay from './UService/Pay';
import NotFoundPage from './NotFoundPage';
import Introduction from './Introduction';
import Agreement from './AgreementDa';
import Registers from './registers';
import CerebralStrokeMain from './HealthManage/CerebralStroke/CerebralStrokeMain';


class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    let user = localStorage.getItem('userInfroData');
    if(user!=null){
      sessionStorage.setItem('userData', user);
    }
  }
  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="login" component={Login}/>
          <Route path="forgetPWD" component={ForgetPWD}/>
          <Route path='/' component={Home} text="/"/>
          <Route path='Articles/:type' component={Articles}/>
          <Route path='Article/:type/:id' component={ArticleDetails}/>
          <Route path='service' component={Service}/>
          <Route path='pay' component={Pay}  onEnter={requireCredentials}/>
          <Route path='Introduction' component={Introduction}/>
          <Route path='Agreement' component={Agreement}/>
          <Route path='register' component={Registers}/>

          <Route path='HealthManage' component={HealthManage} onEnter={requireCredentials}>
            <Route path="MyService" component={MyService}/>
            <Route path="MyReport" component={MyReport}/>
            <Route path="MyData" component={MyData}/>
            <Route path="MySchedule" component={ScheduleMain}/>
            <Route path="CerebralStrokeMain" component={CerebralStrokeMain}/>
          </Route>
          <Route path='ConsultingMain' component={ConsultingMain} onEnter={requireCredentials}>
            <Route path="HMD" component={AskM}/>
            <Route path="HMDUC" component={AskDoc}/>
          </Route>
          <Route path='HealthTeam' component={HealthTeam} onEnter={requireCredentials}>
            <Route path="Teams" component={Teams}/>
          </Route>
          <Route path="Personal" component={PersonalMain} onEnter={requireCredentials}>
            <Route path="data" component={UserData}/>
            <Route path="baseData" component={UserBaseData}/>
            <Route path="setting" component={ChangePWD}/>
            <Route path="medicalEvent" component={UserMedicalEvent}/>
            <Route path="medicalHistory" component={UserMedicalHistory}/>
            <Route path="drugSituation" component={UserDrugSituation}/>
            <Route path="notice" component={Usernotice}/>
            <Route path="announcement" component={UserAnnounce}/>
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Router>
        <Footer />
        <Asides />
      </div >
    );
  }
}

AppComponent.defaultProps = {
};

function requireCredentials(nextState, replace, next) {
  let user = sessionStorage.getItem('userData');
  if(user==null||user==undefined){
    replace('/login');
    next();
  }else{
    next();
  }
}


export default AppComponent;
