/**
 * Created by Benson on 2017/4/10.
 */
import React from 'react';
import UploadStyle from '../../../styles/UploadData.css';
import {UserHelDate} from '../../../InterFace/InterfaceAPI';
import {hashHistory} from 'react-router';
import DataPushState from './DataPreview';
import Load from '../../Load';
class UploadData extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      type:'input',
      states:'none',
      info: '',
      json: '',
      show: false,
    }
  };

  upload(po){
    let file;
    if(po==1){
      file = this.refs.uploadImg.files[0];
    }else{
      file = this.refs.uploadImg2.files[0];
    }
    if (!/image\/\w+/.test(file.type)) {
      alert("只能选择图片");
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      let img = '<div style="border: 1px solid #e3e3fa;float: left;margin-right:12px;position:relative"><span class="glyphicon glyphicon-remove" onClick="$(this).parent().remove()"></span><img src='+this.result+' value='+this.result+'/></div>';
      if(po==1){
        $('#imgShowContent').append(img);
      }else{
        $('#imgShowContent2').append(img);
      }
    }
  };

  onChange(event){
    event.target.value = event.target.value.replace(/[^\d.]/g,'')
  };

  back(status){
    $("#imgShowContent img").empty();
    $("#imgShowContent2 img").empty();
    if(status === 'ok') {
      $('input').val('');
    }
    this.setState({
      ...this.state,
      type:'input',
    })
  }
  componentDidMount(){
    $("#flatpickr_tryme3").flatpickr();
  }
  showMore(){
    this.setState({
      ...this.state,
      show: !this.state.show
    })
  }
  render(){
    let checkItem,date,time,morningSystolicPressure,morningDiastolicPressure,pulseRate,fastBloodSugar,postPrandilaSugar,randomBloodSugar,bloodFatChol,bloodFatTg,bloodFatHdl,bloodFatLdl,heartRate,urineAcid,spo;
    let test;
    let hour = [];
    for(var i=0;i<24;i++){
      if(i<10){
        i='0'+i;
      }
      hour.push(<option value={i} key={i}>{i}</option>)
    }
    let show = null;
    if(this.state.type=='show'){
      show=<DataPushState data={this.state.data} json={this.state.json} back={(status)=>this.back(status)}/>
    }
    return(
      <div className={UploadStyle.contents}>
        {this.state.states=='none'?'':<Load />}
        {show}
        <form className={this.state.type!='input'?UploadStyle.hidden:''} onSubmit={e=>{
          e.preventDefault();

          if(checkItem.value==''&&morningSystolicPressure.value==''&&morningDiastolicPressure.value==''&&pulseRate.value==''&&fastBloodSugar.value==''&&postPrandilaSugar.value==''&&randomBloodSugar.value==''&&bloodFatChol.value==''&&bloodFatTg.value==''&&bloodFatHdl.value==''&&bloodFatLdl.value==''&&heartRate.value==''&&urineAcid.value==''&&spo){
            this.setState({
              ...this.state,
              info:'没有填写任何信息'
            })
            return ;
          }

          this.setState({
            ...this.state,
            states:'doing'
          })

          let ecg=[],images=[];

          let l = $('#imgShowContent img');
          if(l.length>0){
            l.map((obj,i)=>{
                ecg.push({binary:$(i).attr('src').split(',')[1]}) ;
            })
          }
          let l2 = $('#imgShowContent2 img');
          if(l2.length>0){
            l2.map((obj,i)=>{
                images.push({binary:$(i).attr('src').split(',')[1]}) ;
            })
          }

          if(images.length==0){
            images=null;
          }
          if(ecg.length==0){
            ecg=null;
          }

          let json = {
            checkTime: date.value+' '+time.value+':00:00',
            morningSystolicPressure: morningSystolicPressure.value,
            morningDiastolicPressure: morningDiastolicPressure.value,
            pulseRate: pulseRate.value,
            fastBloodSugar: fastBloodSugar.value,
            postPrandilaSugar: postPrandilaSugar.value,
            randomBloodSugar: randomBloodSugar.value,
            bloodFatChol: bloodFatChol.value,
            bloodFatTg: bloodFatTg.value,
            bloodFatHdl: bloodFatHdl.value,
            bloodFatLdl: bloodFatLdl.value,
            heartRate: heartRate.value,
            urineAcid: urineAcid.value,
            spo:spo.value,
            checkItem: checkItem.value,
            ecg: ecg,
            images:images
          }

          let user = sessionStorage.getItem('userData');
          user = JSON.parse(user);
          $.ajax({
            type:'POST',
            contentType:'application/json;charset=UTF-8',
            url:UserHelDate(),
            timeout : 2000,
            headers: {
              "authToken":user.authToken,
            },
            data:JSON.stringify(json),
            success:function(response,status,xhr){
              this.setState({
                type:'show',
                data:response,
                states:'none',
                info: '',
                json: json
              })
            }.bind(this),
            error:function(data,status) {
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
          <div style={{width: '350px',float:'left'}}>
            <span style={{color: "#666"}}>体检时间 : </span>
            <input id="flatpickr_tryme3" ref={node => { date = node }} style={{height:'40px',border:'1px solid #e3e3e3'}}  data-max-date="today"/>
            <span className='glyphicon glyphicon-calendar' style={{marginLeft:'-24px',fontSize:'16px'}}></span>
          </div>
          <div style={{lineHeight:'40px'}}>
            <select style={{marginLeft:'-80px',height:'40px',width:'60px',padding:'10px',borderRadius:'5px'}} ref={node=>{time=node}}>
              {hour}
            </select>&nbsp;时
          </div>
          <div className={UploadStyle.clearFloat}></div>
        </div>
        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>血压</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div className={UploadStyle.textGroup}>
            <div className={UploadStyle.inputGroup}>
              <div>收缩（高）压 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{morningSystolicPressure=node}}/>
              <span> mm/HG</span>
            </div>
            <div className={UploadStyle.inputGroup}>
              <div>舒张（低）压 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{morningDiastolicPressure=node}}/>
              <span> mm/HG</span>
            </div>
            <div className={UploadStyle.inputGroup}>
              <div>脉搏 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{pulseRate=node}} />
              <span> 次/分</span>
            </div>
          </div>
          <div className={UploadStyle.clearFloat}></div>
        </div>

        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>指尖血糖</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div className={UploadStyle.textGroup}>
            <div className={UploadStyle.inputGroup}>
              <div>空腹血糖 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{fastBloodSugar=node}}/>
              <span> mmol/L</span>
            </div>
            <div className={UploadStyle.inputGroup}>
              <div>餐后两小时血糖 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{postPrandilaSugar=node}}/>
              <span> mmol/L</span>
            </div>
            <div className={UploadStyle.inputGroup}>
              <div>随机血糖 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{randomBloodSugar=node}}/>
              <span> mmol/L</span>
            </div>
          </div>
          <div className={UploadStyle.clearFloat}></div>
        </div>

        <div className={UploadStyle.titleContent}>
          <h3 className={UploadStyle.title_A}>血脂</h3>
        </div>
        <div className={UploadStyle.textContent}>
          <div className={UploadStyle.textGroup}>
            <div className={UploadStyle.inputGroup}>
              <div>总胆固醇 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{bloodFatChol=node}}/>
              <span> mmol/L</span>
            </div>
            <div className={UploadStyle.inputGroup}>
              <div>甘油三酯 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{bloodFatTg=node}}/>
              <span> mmol/L</span>
            </div>
            <div className={UploadStyle.inputGroup}>
              <div>高密度脂蛋白胆固醇 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{bloodFatHdl=node}}/>
              <span> mmol/L</span>
            </div>
            <div className={UploadStyle.inputGroup}>
              <div>低密度脂蛋白胆固醇 : </div>
              <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{bloodFatLdl=node}}/>
              <span> mmol/L</span>
            </div>
          </div>
          <div className={UploadStyle.clearFloat}></div>
        </div>

        <div className={this.state.show?'':UploadStyle.hiddens} ref="hiddens">
          <div className={UploadStyle.titleContent}>
            <h3 className={UploadStyle.title_A}>血氧</h3>
          </div>
          <div className={UploadStyle.textContent}>
            <div className={UploadStyle.textGroup}>
              <div className={UploadStyle.inputGroup}>
                <div>血氧 : </div>
                <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{spo=node}}/>
                <span> % </span>
              </div>
              <div className={UploadStyle.inputGroup}>
                <div>静息心率（晨起安静状态下心率） : </div>
                <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{heartRate=node}}/>
                <span> 次/分</span>
              </div>
            </div>
            <div className={UploadStyle.clearFloat}></div>
          </div>

          <div className={UploadStyle.titleContent}>
            <h3 className={UploadStyle.title_A}>血尿酸</h3>
          </div>
          <div className={UploadStyle.textContent}>
            <div className={UploadStyle.textGroup}>
              <div className={UploadStyle.inputGroup}>
                <div>尿酸 : </div>
                <input type="text" onChange={node=>this.onChange(node)} maxLength='5' ref={node=>{urineAcid=node}}/>
                <span> umol/L</span>
              </div>
            </div>
            <div className={UploadStyle.clearFloat}></div>
          </div>

          <div className={UploadStyle.titleContent}>
            <h3 className={UploadStyle.title_A}>心电图</h3>
          </div>
          <div className={UploadStyle.textContent}>
            <div style={{position:'relative'}}>
              <span>心电图图片:</span>
              <button className={UploadStyle.uplodaBTN}>上传图片</button>
              <input type="file" className={UploadStyle.file} ref="uploadImg"  onChange={()=>this.upload(1)}/>
              <span style={{fontSize:'12px',color:'red'}}> &nbsp;&nbsp;可上传多张图片</span>
            </div>
            <div className={UploadStyle.imgShow} id="imgShowContent">
            </div>
            <div className={UploadStyle.clearFloat}></div>
          </div>

          <div className={UploadStyle.titleContent}>
            <h3 className={UploadStyle.title_A}>检查报告</h3>
          </div>
          <div className={UploadStyle.textContent}>
            <div>
              <div style={{color:'#999'}}>如有多个检查项目，请在检查项目说明，并可上传多张检查报告</div>
              <br/>
              <div style={{float:'left'}}>检查报告: </div>
              <textarea className="form-control" className={UploadStyle.textAre} ref={node=>{checkItem=node}}></textarea>
            </div>
            <div style={{position:'relative'}}>
              <span>检查报告图片:</span>
              <button className={UploadStyle.uplodaBTN}>上传图片</button>
              <input type="file" className={UploadStyle.file} ref="uploadImg2"  onChange={()=>this.upload(2)}/>
              <span style={{fontSize:'12px',color:'red'}}> &nbsp;&nbsp;可上传多张图片</span>
            </div>
            <div className={UploadStyle.imgShow} id="imgShowContent2">
            </div>
            <div className={UploadStyle.clearFloat}></div>
          </div>
        </div>
          <div className="text-center" style={{color:'red'}}>
            {this.state.info}
          </div>
        <br/>
        <input className={['center-block',UploadStyle.BTNBack].join(' ')} style={{marginLeft:'auto'}} onClick={()=>this.showMore()} value={this.state.show?'隐藏':'显示更多'} type="button"/>
          <br/>
        <button className={[UploadStyle.BTN,'center-block'].join(' ')} type="submit">预览</button>
        </form>
      </div>
    )
  }
}
export default UploadData;
