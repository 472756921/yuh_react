/**
 * Created by Benson on 2017/4/1.
 */
import React from 'react';
import ArticleDetailStyle from '../../styles/ArticleDetail.css';
import AppHead from '../Head/HeadMain';
import ArticleTitleNav from './ArticleTitleNav';
import Article from './ArticleType/Article';
import Risk from './ArticleType/Risk';
import Health from './ArticleType/Health';
import MonJi from './ArticleType/MonJi';
import Year from './ArticleType/Year';
import YearEG from './ArticleType/YearEG';
import ASKM from './ArticleType/ASKM';
import ASKDOC from './ArticleType/ASKDOC';
import HealthTeam from './ArticleType/HealthTeam';
import TopThree from './ArticleType/TopThree';
import TopThreeFU from './ArticleType/TopThreeFU';
import CerebralStrokeDatile from './ArticleType/CerebralStrokeDatile';
import {sendRead} from '../../InterFace/InterfaceAPI';

class ArticleDetails extends React.Component{
  constructor(props) {
    super(props);
  };
  componentDidMount(){
    document.getElementById('top').scrollIntoView()
  }

  sendRead(type,id){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.post(sendRead(type,id,user.authToken),(rs)=>{
      console.log(rs)
    })
  }

  render(){
    let type='';
    let classes = '';
    switch (this.props.params.type){
      case '0':
        type = '主治医生观点';
        classes = <Article cid={this.props.params.id}/>
        break;
      case '1':
        type = '最新文章';
        classes = <Article cid={this.props.params.id}/>
        break;
      case '2':
        type = '风险评估报告';
        classes = <Risk data={this.props.location.state}/>
        let idr = this.props.location.state.data.id;
        this.sendRead(1,idr);
        break;
      case '3':
        type = '健康管理计划';
        classes = <Health data={this.props.location.state}/>
        let idh = this.props.location.state.data.personalHealthManagementTemplateJson.id;
        this.sendRead(2,idh);
        break;
      case '4':
        type = '月度健康报告';
        classes = <MonJi data={this.props.location.state}/>
        let idm = this.props.location.state.id;
        this.sendRead(4,idm);
        break;
      case '12':
        type = '季度健康报告';
        classes = <MonJi data={this.props.location.state}/>
        let idj = this.props.location.state.id;
        this.sendRead(4,idj);
        break;
      case '5':
        type = '年度健康报告';
        classes = <Year data={this.props.location.state}/>
        let idy = this.props.location.state.id;
        this.sendRead(4,idy);
        break;
      case '6':
        type = '问健管师';
        classes = <ASKM id={this.props.location.state.id}/>
        break;
      case '7':
        type = '问医生';
        classes = <ASKDOC id={this.props.location.state.id}/>
        break;
      case '8':
        type = '健康团队';
        classes = <HealthTeam id={this.props.location.state.id}/>
        break;
      case '9':
        type = '三甲方案详情';
        classes = <TopThree data={this.props.location.state}/>
        let ids = this.props.location.state.id;
        this.sendRead(2,ids);
        break;
      case '10':
        type = '三甲方随访';
        classes = <TopThreeFU />
        break;
      case '11':
        type = '脑卒中随访报告';
        classes = <CerebralStrokeDatile id={this.props.params.id}/>
        break;
      case 'eg':
        type = '年度健康报告示例';
        classes =  <YearEG data={this.props.location.state}/>
        break;
      default:
        break;
    }
    return (
      <div>
        <AppHead type="TOP"/>
        <div className={ArticleDetailStyle.bk}>
          <div className={ArticleDetailStyle.content}>
            <ArticleTitleNav type={type}/>
            {classes}
            <div className={ArticleDetailStyle.clear}></div>
            {this.props.params.type=='6'||this.props.params.type=='7'?'':<button onClick={()=>{window.history.back()}} className={[ArticleDetailStyle.btn_user,'btn','center-block'].join(" ")}>返回</button>}
          </div>
        </div>
      </div>
    )
  }
}
export default ArticleDetails;
