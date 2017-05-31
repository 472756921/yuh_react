/**
 * Created by Benson on 2017/4/10.
 */
import React from 'react';
import UploadStyle from '../../../styles/UploadData.css';
import {UserHelDatePost} from '../../../InterFace/InterfaceAPI';
import Load from '../../Load';
class UploadData extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      info:'',
      states:'none'
    }
  };

  render(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    let ecg=[];
    if(this.props.data.ecg!=null){
      ecg = this.props.data.ecg.map((o,i)=>{
        return (<img src={o.url} key={i}/>);
      })
    }
    let img=[];
    if(this.props.data.images!=null){
      img = this.props.data.images.map((o,i)=>{
        return (<img src={o.url} key={i}/>);
      })
    }

    return(
      <div className={UploadStyle.contents} style={{lineHeight:'40px',color:'#666'}}>
        {this.state.states=='none'?'':<Load />}
        <form onSubmit={e=>{
          e.preventDefault();

          this.setState({
            ...this.state,
            states:'doing'
          })

          let DataJson = this.props.json;
          if(DataJson.checkItem==''){
            DataJson.checkItem=null;
          }

          $.ajax({
            type:'POST',
            timeout : 2000,
            contentType:'application/json;charset=UTF-8',
            url:UserHelDatePost(),
            headers: {
              "authToken":user.authToken
            },
            data:JSON.stringify(DataJson),
            success:function(response,status,xhr){
              alert('上传成功！')
              this.setState({
                info: '提交成功',
                states: 'none'
              })
            }.bind(this),
            error:function(data) {
              this.setState({
                states:'none',
              })
              if(status=='timeout'){
                this.setState({
                  info:'网络不给力，歇会儿再试试吧'
                })
              }else{
                this.setState({
                  info:data.responseJSON.message
                })
              }
            }.bind(this),
           });
        }}>
        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>体检时间</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div>体检时间：{this.props.data.checkTime}</div>
        </div>
        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>血压</h3>
        </div>
        <div className={UploadStyle.textContent}>
            <div>收缩（高）压 : {typeof this.props.data.morningSystolicPressure=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.morningSystolicPressure+' mm/HG'}
              <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
                {typeof this.props.data.morningSystolicPressureWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.morningSystolicPressureWarning}</span>:''}
              </div>
            </div>
            <div>舒张（低）压 :  {typeof this.props.data.morningDiastolicPressure=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.morningDiastolicPressure+' mm/HG'}
              <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
                {typeof this.props.data.morningDiastolicPressureWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.morningDiastolicPressureWarning}</span>:''}
              </div>
            </div>
            <div>脉搏 : {typeof this.props.data.pulseRate=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.pulseRate+' 次/分'}
              <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
                {typeof this.props.data.pulseRateWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.pulseRateWarning}</span>:''}
              </div>
            </div>
        </div>

        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>指尖血糖</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div>空腹血糖 : {typeof this.props.data.fastBloodSugar=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.fastBloodSugar+' mmol/L'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.fastBloodSugarWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.fastBloodSugarWarning}</span>:''}
            </div>
          </div>
          <div>餐后两小时血糖 : {typeof this.props.data.postPrandilaSugar=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.postPrandilaSugar+' mmol/L'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.postPrandilaSugarWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.postPrandilaSugarWarning}</span>:''}
            </div>
          </div>
          <div>随机血糖 : {typeof this.props.data.randomBloodSugar=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.randomBloodSugar+' mmol/L'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.bloodFatCholWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.bloodFatCholWarning}</span>:''}
            </div>
          </div>
        </div>

        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>血脂</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div>总胆固醇 :  {typeof this.props.data.bloodFatChol=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.bloodFatChol+' mmol/L'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.bloodFatCholWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.bloodFatCholWarning}</span>:''}
            </div>
          </div>
          <div>甘油三酯 : {typeof this.props.data.bloodFatTg=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.bloodFatTg+' mmol/L'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.bloodFatTgWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.bloodFatTgWarning}</span>:''}
            </div>
          </div>
          <div>高密度脂蛋白胆固醇 : {typeof this.props.data.bloodFatHdl=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.bloodFatHdl+' mmol/L'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.bloodFatHdlWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.bloodFatHdlWarning}</span>:''}
            </div>
          </div>
          <div>低密度脂蛋白胆固醇 : {typeof this.props.data.bloodFatLdl=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.bloodFatLdl+' mmol/L'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.bloodFatTgWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.bloodFatTgWarning}</span>:''}
            </div>
          </div>
        </div>

        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>血氧</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div>血氧 : {typeof this.props.data.spo=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.spo+' %'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.spoWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.spoWarning}</span>:''}
            </div>
          </div>

          <div>静息心率 : {typeof this.props.data.heartRate=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.heartRate+' 次/分'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.heartRateWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.heartRateWarning}</span>:''}
            </div>
          </div>
        </div>

        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>血尿酸</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div>尿酸 : {typeof this.props.data.urineAcid=='undefined'?<span style={{color:'red'}}>暂无数据</span>:this.props.data.urineAcid+' umol/L'}
            <div className="pull-right" style={{marginRight:'400px',color:'red'}}>
              {typeof this.props.data.urineAcidWarning!='undefined'?<span><img style={{verticalAlign:'sub'}} src={ require('images/ICON/fuwu_icon4.png') } width="15"/> {this.props.data.urineAcidWarning}</span>:''}
            </div>
          </div>
        </div>

        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>心电图</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div className={UploadStyle.imgShow} id="imgShowContent">
            {ecg}
          </div>
        </div>

        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>检查报告</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div style={{float:'left'}}>检查报告: {this.props.data.checkItem==''?<span style={{color:'red'}}>暂无数据</span>:this.props.data.checkItem}</div>
          <br/>
          <div className={UploadStyle.imgShow} id="imgShowContent2">{img}</div>
        </div>
        <div className="text-center" style={{color:'red'}}>
          {this.state.info}
        </div>
          <br/>
        <div className={UploadStyle.btngroup}>
          {this.state.info=='提交成功'?'':<button className={UploadStyle.BTN}>提交</button>}
          <button className={UploadStyle.BTNBack} onClick={this.props.back}>返回</button>
        </div>
        </form>
      </div>
    )
  }
}
export default UploadData;
