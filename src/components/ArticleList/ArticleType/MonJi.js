/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import MonJiStyle from '../../../styles/reportMonth.css';
import {getAutomationReportDatil,getImg} from '../../../InterFace/InterfaceAPI';


class MonJi extends React.Component{
  constructor(props) {
    super(props);

    this.state= {
      name: '',
      IDNumber: '',
      height: '',
      weight: '',
      BMI: '',
      chronicDiseaseType: '',
      date:this.props.data.date.split(' ~ ')[1]+'~'+this.props.data.date.split(' ~ ')[0],
      allNumPressure: '',
      routines:[],
      bloodFats:[],
      bloodPressures: [],
      bloodSugars:[],
      bloodPressure_pic: '',
      bloodPressureText: '',
      bloodSugar_pic: '',
      bloodSugarText: '',
    }

    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);

    $.get(getAutomationReportDatil(this.props.data.date.split(' ~ ')[1],this.props.data.date.split(' ~ ')[0],user.authToken),function(rs){
      this.setState({
        name: rs.realName,
        IDNumber: rs.idNumber,
        height: rs.height,
        weight: rs.weight,
        BMI: rs.bmi,
        chronicDiseaseType: rs.chronicDiseaseType,
        date:this.props.data.date.split(' ~ ')[1]+'~'+this.props.data.date.split(' ~ ')[0],
        allNumPressure: rs.allNumPressure,
        routines: rs.routines,
        bloodFats: rs.bloodFats,
        bloodPressures: rs.bloodPressures,
        bloodSugars: rs.bloodSugars,
        bloodPressure_pic: rs.bloodPressure_pic,
        bloodPressureText: rs.bloodPressureText,
        bloodSugar_pic: rs.bloodSugar_pic,
        bloodSugarText: rs.bloodSugarText,

      })
    }.bind(this))



  }
  render(){
    return(
      <div className={MonJiStyle.report_Risk_index_A}>
        <div className={MonJiStyle.report_Risk_index_A_content}>
          <div className={MonJiStyle.report_Risk_index_A_dish}>
            <div className={MonJiStyle.report_Risk_index_A_dish_title}>
              <span className={MonJiStyle.vertical_bar}></span>
              用户基本信息
            </div>
            <div className={MonJiStyle.user_data}>姓名：&nbsp; {this.state.name}</div>
            <div className={MonJiStyle.user_data}>身份证号码：&nbsp; {this.state.IDNumber}</div>
            <div className={MonJiStyle.user_data}>病史：&nbsp; {this.state.chronicDiseaseType}</div>
            <div className={MonJiStyle.user_data}>身高：&nbsp; {this.state.height}</div>
            <div className={MonJiStyle.user_data}>体重：&nbsp; {this.state.weight}</div>
            <div className={MonJiStyle.user_data}>BMI：&nbsp; {this.state.BMI}</div>
            <div className={MonJiStyle.user_data}>测量时间段：&nbsp; {this.state.date}</div>
            <div className={MonJiStyle.user_data}>测量次数：&nbsp; {this.state.allNumPressure}</div>
            <p style={{clear: 'both',margin:0}}></p>
          </div>

          <div className={MonJiStyle.report_Risk_index_A_dish}>
            <div className={MonJiStyle.report_Risk_index_A_dish_title}>
              <span className={MonJiStyle.vertical_bar}></span>全面体征检测结果
            </div>
            <table className="table table-striped table-bordered">
              <tbody>
              <tr>
                <td>体检时间</td>
                <td>腰围</td>
                <td>臀围</td>
                <td>腰臀比</td>
                <td>脂肪率</td>
                <td>基础代谢</td>
                <td>水分含量</td>
                <td>血氧饱和度</td>
              </tr>
              <tr>
                <td>参考范围</td>
                <td>\</td>
                <td>\</td>
                <td>＜0.85</td>
                <td>23 ~ 27 %</td>
                <td>909 ~ 1111 KCAL</td>
                <td>45 ~ 60 %</td>
                <td>95 ~ 100 %</td>
              </tr>

              {
                this.state.routines.map((obj,i)=>{
                  return(
                    <tr key={i}>
                      <td>{obj.checkTime}</td>
                      <td>{obj.waist}</td>
                      <td>{obj.hipline}</td>
                      <td>{obj.whr}</td>
                      <td>{obj.fatPercentage}</td>
                      <td>{obj.basalMetabolism}</td>
                      <td>{obj.waterContent}</td>
                      <td>{obj.spo}</td>
                    </tr>
                  )
                })

              }
              </tbody>
            </table>

            <div className={MonJiStyle.report_Risk_index_A_dish_title}>
              <span className={MonJiStyle.vertical_bar}></span>尿酸、血脂四项检测结果
            </div>
            <table className="table table-striped table-bordered">
              <tbody>
              <tr>
                <td>体检时间</td>
                <td>尿酸</td>
                <td>总胆固醇</td>
                <td>甘油三酯</td>
                <td>高密度蛋白胆固醇</td>
                <td>低密度蛋白胆固醇</td>
              </tr>
              <tr>
                <td>参考范围</td>
                <td>0.09 ~ 0.36 umol/L</td>
                <td>2.90 ~ 5.90 mmol/L</td>
                <td>0.30 ~ 1.80 mmol/L</td>
                <td>1.05 ~ 1.95 mmol/L</td>
                <td>0.50 ~ 3.15 mmol/L</td>
              </tr>
              {
                this.state.bloodFats.map((obj,i)=>{
                  return(
                    <tr key={i}>
                      <td>{obj.checkTime}</td>
                      <td>{obj.urineAcid}</td>
                      <td>{obj.bloodFatChol}</td>
                      <td>{obj.bloodFatTg}</td>
                      <td>{obj.bloodFatHdl}</td>
                      <td>{obj.bloodFatLdl}</td>
                    </tr>
                  )
              })

              }
              </tbody>
            </table>

            <div className={MonJiStyle.report_Risk_index_A_dish}>
              <div className={MonJiStyle.report_Risk_index_A_dish_title}>
                <span className={MonJiStyle.vertical_bar}></span>趋势图
              </div>
              <h4 className={MonJiStyle.report_Risk_index_A_dish_title_B}>血压趋势图</h4>
              <img src={getImg(xueya)}/>
              <br/>
              <img src={this.state.bloodPressure_pic} style={{marginBottom: '25px'}} width="700"/>
              <div className={[MonJiStyle.img_text_content,'pull-right'].join(' ')}>{this.state.bloodPressureText}</div>
              <p style={{clear: 'both'}}></p>
              <table className="table">
                <tbody>
                <tr style={{background:'#f5f5f5',fontSize:'16px'}}>
                  <td>收缩（高）压</td>
                  <td>舒张（低）压</td>
                  <td>脉搏</td>
                  <td>体检时间</td>
                </tr>
                {
                  this.state.bloodPressures.map((obj,i)=>{
                    return (
                      <tr key={i}>
                        <td><span className={obj.mspState==0?'':obj.mspState==1?MonJiStyle.red:MonJiStyle.green}>{obj.morningSystolicPressure}</span> mm/HG {obj.mspState==0?'':obj.mspState==1?<img src={require('images/ICON/high.png')}/>:<img src={require('images/ICON/low.png')}/>}</td>
                        <td><span className={obj.mdpState==0?'':obj.mdpState==1?MonJiStyle.red:MonJiStyle.green}>{obj.morningDiastolicPressure}</span> mm/HG {obj.mdpState==0?'':obj.mdpState==1?<img src={require('images/ICON/high.png')}/>:<img src={require('images/ICON/low.png')}/>}</td>
                        <td>{obj.pulseRate} 次/分</td>
                        <td>{obj.checkTime}</td>
                      </tr>
                    )
                  })

                }
                </tbody>
              </table>
              <br/>
              <h4 className={MonJiStyle.report_Risk_index_A_dish_title_B}>血糖趋势图</h4>
              <img src={getImg(xuetang)}/>
              <br/>
              <img src={this.state.bloodSugar_pic} style={{marginBottom: '25px'}} width="700"/>
              <div className={[MonJiStyle.img_text_content,'pull-right'].join(' ')}>{this.state.bloodSugarText}</div>
              <p style={{clear: 'both'}}></p>
              <table className="table table-striped">
                <tbody>
                <tr>
                  <td>空腹血糖</td>
                  <td>餐后两小时血糖</td>
                  <td>随机血糖</td>
                  <td>体检时间</td>
                </tr>
                {
                  this.state.bloodSugars.map((obj,i)=>{
                    return(
                      <tr key={i}>
                        <td><span className={obj.fbsState==2?'':obj.fbsState==1?MonJiStyle.red:MonJiStyle.green}>{obj.fastBloodSugar}</span> mmol/L {obj.fbsState==2?'':obj.fbsState==1?<img src={require('images/ICON/high.png')}/>:<img src={require('images/ICON/low.png')}/>}</td>
                        <td><span className={obj.ppsState==2?'':obj.ppsState==1?MonJiStyle.red:MonJiStyle.green}>{obj.postPrandilaSugar}</span> mmol/L {obj.ppsState==2?'':obj.ppsState==1?<img src={require('images/ICON/high.png')}/>:<img src={require('images/ICON/low.png')}/>}</td>
                        <td><span className={obj.rbsState==2?'':obj.rbsState==1?MonJiStyle.red:MonJiStyle.green}>{obj.randomBloodSugar}</span> mmol/L {obj.rbsState==2?'':obj.rbsState==1?<img src={require('images/ICON/high.png')}/>:<img src={require('images/ICON/low.png')}/>}</td>
                        <td>{obj.checkTime}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MonJi;
