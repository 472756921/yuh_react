/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import YearJiStyle from '../../../styles/reportYear.css';
import {majordignosereportDatil} from '../../../InterFace/InterfaceAPI';

let userName;
class MonJi extends React.Component{
  constructor(props) {
    super(props);
    this.state= {}

    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    userName=user.realName;
    $.get(majordignosereportDatil(1627,this.props.data.id,user.authToken),function(rs){
      this.setState({
        ...rs,
      })
    }.bind(this))

  }
  render(){
    let bmi,bloodFatChol,bloodFatTg,bloodFatLdl,bloodFatHdl,spo,urineAcid,electrocardiogram;
    let text_ = '请您亲临附近的优医慢病管理中心进行测量。';
    if(typeof(this.state.bmi)!='undefined'){

      function createTable(cl,name,t){
        return(
          <table className="table table-striped table-bordered" style={{width:'700px',textAlign:'left'}}>
            <tbody>
              <tr>
                <td>检测时间</td>
                <td>{name}</td>
              </tr>
              {
                cl.map((obj, i)=> {
                  return (
                    <tr key={i}>
                      <td width="290">{obj.uptime}</td>
                      <td>{obj.itemValue} {t}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }
      if(this.state.bmi.length!=0){
        bmi =createTable(this.state.bmi,'BMI','mmol/L');
      }else{
        bmi = <div className={YearJiStyle.red}>您近期尚未进行BMI测量，BMI一定程度上反应了您的体型和基本健康情况，{text_}</div>
      }
      if(this.state.bloodFatChol.length!=0){
        bloodFatChol =createTable(this.state.bloodFatChol,'总胆固醇','mmol/L');
      }else{
        bloodFatChol = <div className={YearJiStyle.red}> 您近期尚未进行总胆固醇的检测，总胆固醇是反应血脂水平的重要指标，也可以反应出您的饮食结构及生活方式是否健康，{text_}</div>
      }
      if(this.state.bloodFatTg.length!=0){
        bloodFatTg =createTable(this.state.bloodFatTg,'甘油三酯','mmol/L');
      }else{
        bloodFatTg = <div className={YearJiStyle.red}> 您近期尚未进行总胆固醇的检测，总胆固醇是反应血脂水平的重要指标，也可以反应出您的饮食结构及生活方式是否健康，{text_}</div>
      }
      if(this.state.bloodFatLdl.length!=0){
        bloodFatLdl =createTable(this.state.bloodFatLdl,'低密度脂蛋白胆固醇','mmol/L');
      }else{
        bloodFatLdl = <div className={YearJiStyle.red}>您近期尚未进行低密度脂蛋白胆固醇的检测，这一指标可以预测心脑血管风险和疾病的发生，也可以反应出您的饮食结构及生活方式是否健康，{text_}</div>
      }
      if(this.state.bloodFatHdl.length!=0){
        bloodFatHdl =createTable(this.state.bloodFatHdl,'高密度脂蛋白胆固醇','mmol/L');
      }else{
        bloodFatHdl = <div className={YearJiStyle.red}>您近期尚未进行高密度脂蛋白总胆固醇的检测，这一指标往往被认为对心脑血管有较好的保护作用，{text_}</div>
      }
      if(this.state.spo.length!=0){
        spo =createTable(this.state.spo,'血氧饱和度','%');
      }else{
        spo = <div className={YearJiStyle.red}>您近期尚未进行指尖血氧饱和度的检测，这一指标是呼吸循环的重要参数，反映了您血液携氧能力和末梢循环功能，{text_}</div>
      }
      if(this.state.urineAcid.length!=0){
        urineAcid =createTable(this.state.urineAcid,'尿酸','umol/L');
      }else{
        urineAcid = <div className={YearJiStyle.red}>您近期尚未进行血尿酸的检测，尿酸的高低直接和您体内嘌呤代谢相关，尿酸增高可引起高尿酸血症甚至诱发痛风，尿酸的控制需要饮食结构的配合，{text_}</div>
      }
      if(this.state.electrocardiogram.length!=0){
        electrocardiogram = this.state.electrocardiogram.map((obj,i)=>{
          return(
            <div key={i}>
              <h4 className={YearJiStyle.title_B}>{obj.uptime}</h4>
              <img src={obj.itemValue}/>
            </div>
          )
        })
      }else{
        electrocardiogram = <div className={YearJiStyle.red}>您还没有上传心电图</div>
      }

    }
    return(
      <div>
        <h2 style={{textAlign:'center',marginTop:'40px'}}>年度健康报告</h2>
        <div className={YearJiStyle.content}>
          <div style={{lineHeight:'40px'}}>
            尊敬的 {userName} 先生(女士)
            <div style={{textIndent:'28px'}}>
              感谢您一直以来对“优医”的信任与支持。现向您呈现在过去的一个医疗周期里您的指尖血糖监测记录及医生的解读报告，请认真阅读，也可联系我们的客服热线400-080-8820或医生助理寻求更进一步的指导。祝您身体健康，工作顺利。
            </div>
          </div>

          <div className={YearJiStyle.pu}>
            <h3 className={YearJiStyle.title_A}><span></span>常规检测</h3>
            <div>
              <h4 className={YearJiStyle.title_B}>BMI <small> (参考范围:18.5~24.00 mmol/L)</small></h4>
              {bmi}
            </div>
            <div>
              <h4 className={YearJiStyle.title_B}>总胆固醇 <small> (参考范围:2.9~5.8 mmol/L)</small></h4>
              {bloodFatChol}
            </div>
            <div>
              <h4 className={YearJiStyle.title_B}>甘油三酯 <small> (参考范围:0.23~1.70 mmol/L)</small></h4>
              {bloodFatTg}
            </div>
            <div>
              <h4 className={YearJiStyle.title_B}>低密度脂蛋白胆固醇 <small> (参考范围:0.5~3.1 mmol/L)</small></h4>
              {bloodFatLdl}
            </div>
            <div>
              <h4 className={YearJiStyle.title_B}>高密度脂蛋白胆固醇 <small> (参考范围:0.98~2 mmol/L)</small></h4>
              {bloodFatHdl}
            </div>
            <div>
              <h4 className={YearJiStyle.title_B}>血氧饱和度 <small> (参考范围:94-100 %)</small></h4>
              {spo}
            </div>
            <div>
              <h4 className={YearJiStyle.title_B}>尿酸<small> (参考范围:150~420 umol/L)</small></h4>
              {urineAcid}
            </div>
          </div>

          <div className={YearJiStyle.pu}>
            <h3 className={YearJiStyle.title_A}><span></span>趋势图</h3>
            <h4 className={YearJiStyle.title_B}>血压趋势图</h4>
            <img src={this.state.bloodPressure_pic}/>
            <h4 className={YearJiStyle.title_B}>血糖趋势图</h4>
            <img src={this.state.bloodSugar_pic}/>
          </div>

          <div className={YearJiStyle.pu}>
            <h3 className={YearJiStyle.title_A}><span></span>心电图</h3>
            {electrocardiogram}
          </div>

          <div className={YearJiStyle.pu}>
            <h3 className={YearJiStyle.title_A}><span></span>人体成分分析</h3>
            <div style={{textAlign:'center',lineHeight:'30px',margin:'20px'}}>
              <div className="col-sm-4">脂肪率 : {this.state.fatPercentage} %
                {this.state.fatPercentage_tred==1?<span style={{color:'red'}}> ↑</span>:''}
                {this.state.fatPercentage_tred==3?<span style={{color:'red'}}> ↓</span>:''}
              </div>
              <div className="col-sm-4">基础代谢 : {this.state.basalMetabolism}
                {this.state.basalMetabolism_tred==1?<span style={{color:'red'}}> ↑</span>:''}
                {this.state.basalMetabolism_tred==3?<span style={{color:'red'}}> ↓</span>:''}
              </div>
              <div className="col-sm-4">水分含量 : {this.state.waterContent} %
                {this.state.waterContent_tred==1?<span style={{color:'red'}}> ↑</span>:''}
                {this.state.waterContent_tred==3?<span style={{color:'red'}}> ↓</span>:''}
              </div>
              <div className="col-sm-4">腰围 : {this.state.waist}
                {this.state.waist_tred==1?<span style={{color:'red'}}> ↑</span>:''}
                {this.state.waist_tred==3?<span style={{color:'red'}}> ↓</span>:''}
              </div>
              <div className="col-sm-4">臀围 : {this.state.hipline}
                {this.state.hipline_tred==1?<span style={{color:'red'}}> ↑</span>:''}
                {this.state.hipline_tred==3?<span style={{color:'red'}}> ↓</span>:''}
              </div>
              <div className="col-sm-4">腰臀比 : {this.state.whr}
                {this.state.whr_tred==1?<span style={{color:'red'}}> ↑</span>:''}
                {this.state.whr_tred==3?<span style={{color:'red'}}> ↓</span>:''}
              </div>
            </div>
            <div style={{clear:'both'}}></div>
            <h4 className={YearJiStyle.title_B}>体质分析结果</h4>
            <div style={{textIndent:'28px'}}>{this.state.tmcCheckInfo==null?'暂无结果':this.state.tmcCheckInfo}</div>
          </div>

          <div className={YearJiStyle.pu}>
            <h3 className={YearJiStyle.title_A}><span></span>健康报告</h3>
            <h4 className={YearJiStyle.title_B}>血压波动趋势</h4>
            <div style={{textIndent:'28px'}}>{this.state.comment1}</div>
            <h4 className={YearJiStyle.title_B}>血压异常分析</h4>
            <div style={{textIndent:'28px'}}>{this.state.comment2}</div>
            <h4 className={YearJiStyle.title_B}>综合分析</h4>
            <div style={{textIndent:'28px'}}>{this.state.comment3}</div>
            <h4 className={YearJiStyle.title_B}>健康建议</h4>
            <div style={{textIndent:'28px'}}>{this.state.comment4}</div>
          </div>

        </div>
      </div>
    )
  }
}
export default MonJi;
