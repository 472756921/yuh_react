/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import RiskStyle from '../../../styles/Risk.css';
import {CerebralSDatile} from '../../../InterFace/InterfaceAPI';

let user;
class CerebralStrokeDatile extends React.Component{
  constructor(props) {
    super(props);
    let userinfo = sessionStorage.getItem('userData');
    user = JSON.parse(userinfo);
    this.state={
      data:''
    };
  }

  componentDidMount(){
    let id=this.props.id;
    $.get(CerebralSDatile(id,user.authToken),(rs)=>{
      this.setState({
        data: rs
      })
    })
  }

  checkedrugContent(content){
    if(content!=null&&content!=''){
      return 'YES'
    }else{
      return 'NO'
    }
  }

  render(){
    let la='';
    //药物情况
    let medStat= [];
    //卒中警示症状
    let warning = [];
    //健康教育
    let edu = [];
    //非药物治疗情况
    let noeMed = [];
    //血管超声检查
    let boold = [];
    if(this.state.data!=''&&this.state.data!=undefined){
      la = this.state.data.map((la,i)=>{
        let table=<table className="table table-bordered">
          <caption className="text-center"><h4>{i+1}月数据</h4></caption>
          <thead>
          <tr className="active">
            <td>收缩压</td>
            <td>舒张压</td>
            <td>空腹血糖</td>
            <td>餐后血糖</td>
            <td>房颤抗凝监测</td>
            <td>药物治疗情况</td>
            <td>卒中警示症状</td>
            <td>健康教育</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{la.sbp==null?'/':la.sbp}</td>
            <td>{la.dbp==null?'/':la.dbp}</td>
            <td>{la.fbg==null?'/':la.fbg}</td>
            <td>{la.ldl==null?'/':la.ldl}</td>
            <td>{la.inr==null?'/':la.inr}</td>
            <td>{this.checkedrugContent(la.drugTreatments)}</td>
            <td>{this.checkedrugContent(la.strokeWarningSymptoms)}</td>
            <td>{this.checkedrugContent(la.healthEducation)}</td>
          </tr>
          </tbody>
        </table>

        let jidu = '';
        let naindu = '';

        if(i==2||i==5){
          jidu = <table className="table table-bordered">
            <thead>
            <tr className='success'>
              <td>总胆固醇</td>
              <td>甘油三酯</td>
              <td>低密度脂蛋白</td>
              <td>高密度脂蛋白</td>
              <td>身高</td>
              <td>体重</td>
              <td>BMI</td>
              <td>腰围</td>
              <td>非药物治疗情况</td>
              <td>接受管理程度</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{la.chol}</td>
              <td>{la.tg}</td>
              <td>{la.ldl}</td>
              <td>{la.hdl}</td>
              <td>{la.height}</td>
              <td>{la.weight}</td>
              <td>{la.bmi}</td>
              <td>{la.waist}</td>
              <td>{this.checkedrugContent(la.nonDrugTreatment)}</td>
              <td>{la.acceptTheDegreeOfManagement}</td>
            </tr>
            </tbody>
          </table>
        }

        if(i==5){
          let newfind='暂无数据';
          if(la.healthStatus!=null&&la.healthStatus!=undefined){
            newfind=la.healthStatus.diseaseDiagnosisList.map((o,k)=>(
              <div key={k}>{o.disease} - {o.diagnosisDate!=null?o.diagnosisDate:'未出现'}</div>
            ))
          }

            naindu = <div>
              <div>血管超声检查监测 : {this.checkedrugContent(la.vascularUltrasounds)}</div>
              <div>体检新发现 : {la.healthStatus!=undefined?la.healthStatus.newDiscovery:'暂无数据'}</div>
              <div style={{padding:'10px 40px',background:'#eee'}}>{newfind}</div>
              <div>患者自评中风危险等级 : {la.strokePreventiveInterventionReport!=undefined?la.strokePreventiveInterventionReport.thinkStroke=='否'?'患者认为无风险':la.strokePreventiveInterventionReport.thinkStroke:'暂无数据'}</div>
              <div>患者卒中认知水平 : {la.strokePreventiveInterventionReport!=undefined?la.strokePreventiveInterventionReport.strokeCognitiveLevel:'暂无数据'}</div>
              <div>半年危险因素管理评价 : {la.strokePreventiveInterventionReport!=undefined?la.strokePreventiveInterventionReport.riskFactorManagementEvaluation:'暂无数据'}</div>
              <div>卒中预防半年报告 : {la.strokePreventiveInterventionReport!=undefined?la.strokePreventiveInterventionReport.planAdjustment:'暂无数据'}</div>
            </div>

        }
        return(
          <div key={i}>
            {table}
            {jidu}
            {naindu}
          </div>
        )

      })
      //药物治疗情况
      this.state.data.map((las,i)=> {
        medStat.push( <tr key={i}>
          <td>{i + 1}月</td>
          <td>{las.drugTreatments!=''?las.drugTreatments[0].medicationMethods:'/'} <br/> {las.drugTreatments[0]==null||las.drugTreatments[0]==undefined?'':las.drugTreatments[0].drug}</td>
          <td>{las.drugTreatments!=''?las.drugTreatments[1].medicationMethods:'/'} <br/> {las.drugTreatments[1]==null||las.drugTreatments[1]==undefined?'':las.drugTreatments[1].drug}</td>
          <td>{las.drugTreatments!=''?las.drugTreatments[2].medicationMethods:'/'} <br/> {las.drugTreatments[2]==null||las.drugTreatments[2]==undefined?'':las.drugTreatments[2].drug}</td>
          <td>{las.drugTreatments!=''?las.drugTreatments[3].medicationMethods:'/'} <br/> {las.drugTreatments[3]==null||las.drugTreatments[3]==undefined?'':las.drugTreatments[3].drug}</td>
          <td>{las.drugTreatments!=''?las.drugTreatments[4].medicationMethods:'/'} <br/> {las.drugTreatments[4]==null||las.drugTreatments[4]==undefined?'':las.drugTreatments[4].drug}</td>
        </tr>)
        warning.push(
          <tr key={i}>
            <td>{i+1}月</td>
            <td>{las.strokeWarningSymptoms}</td>
          </tr>
        )
        edu.push(
          <tr key={i}>
            <td>{i+1}月</td>
            <td>{las.healthEducation}</td>
          </tr>
        );

        if((i==2||i==5)&&las.selfEvaluation!=undefined){
          noeMed.push(
            <tr key={i}>
              <td>{i==2?'季度':'半年度'}报告</td>
              <td>{las.nonDrugTreatment}</td>
              <td>{las.selfEvaluation.smoking}</td>
              <td>{las.selfEvaluation.drinking}</td>
              <td>{las.selfEvaluation.meatIntake}</td>
              <td>{las.selfEvaluation.vegetablesIntake}</td>
              <td>{las.selfEvaluation.fruitIntake}</td>
              <td>{las.selfEvaluation.lfdpIntake}</td>
              <td>{las.selfEvaluation.physicalActivity}</td>
            </tr>
          );
        }
        if(i==5&&las.vascularUltrasounds!=''){
          boold.push(
            <tr key={i}>
              <td>半年版报告</td>
              <td>{las.vascularUltrasounds[0].result}</td>
              <td>{las.vascularUltrasounds[1].result}</td>
              <td>{las.vascularUltrasounds[2].result}</td>
            </tr>
          )
        }

      })
    }
    return(
      <div className={RiskStyle.report_Risk_index_A_dish}>
        <h3 className="text-center"><h3>脑卒中随访报告</h3>  </h3>
        {la}
        <br/>
        <table className="table table-bordered">
          <caption className="text-center"><h4>药物治疗情况</h4></caption>
          <thead>
          <tr className="active">
            <td width="50">时间</td>
            <td width="200">控制血压药物</td>
            <td width="200">控制血糖药物</td>
            <td width="200">他汀类药物</td>
            <td width="200">抗血小板聚集药物</td>
            <td>房颤抗凝药物</td>
          </tr>
          </thead>
          <tbody>
            {medStat}
          </tbody>
        </table>
        <br/>
        <table className="table table-bordered">
          <caption className="text-center"><h4>卒中警示症状</h4></caption>
          <thead>
          <tr className="active">
            <td width="100">时间</td>
            <td>卒中警示症状</td>
          </tr>
          </thead>
          <tbody>
            {warning}
          </tbody>
        </table>
        <table className="table table-bordered">
          <caption className="text-center"><h4>健康教育</h4></caption>
          <thead>
          <tr className="active">
            <td width="100">时间</td>
            <td>健康教育内容</td>
          </tr>
          </thead>
          <tbody>
            {edu}
          </tbody>
        </table>
        <table className="table table-bordered">
          <caption className="text-center"><h4>非药物治疗情况</h4></caption>
          <thead>
          <tr className="active">
            <td width="100">时间</td>
            <td width="250">非药物治疗措施</td>
            <td>吸烟量(自评)</td>
            <td>饮酒量(自评)</td>
            <td>脂肪摄入量(自评)</td>
            <td>蔬菜摄入量(自评)</td>
            <td>水果摄入量(自评)</td>
            <td>低脂肪奶制品摄入量(自评)</td>
            <td>体力活动量(自评)</td>
          </tr>
          </thead>
          <tbody>
            {noeMed}
          </tbody>
        </table>
        <table className="table table-bordered">
          <caption className="text-center"><h4>血管超声检查</h4></caption>
          <thead>
          <tr className="active">
            <td width="100">时间</td>
            <td>颈动脉</td>
            <td>椎动脉</td>
            <td>锁骨下动脉</td>
          </tr>
          </thead>
          <tbody>
            {boold}
          </tbody>
        </table>
      </div>
    )
  }
}
export default CerebralStrokeDatile;
