/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import PersonalStyle from '../../styles/Personal.css';
import {GETUserSituation,DelUserSituation,Getmedicine,GetmedicineHuaXueByName,GetmedicineByName,PostUserSituation} from '../../InterFace/InterfaceAPI';
import SelectInput from '../SelectInput/SelectInput';

let postJson;
class UserDrugSituation extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      situatio:'',
      medicine:'',
      medicineH:'',
      fist:true,
    }
  }

  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(GETUserSituation(user.authToken),(rss)=>{
      postJson = rss;
      $.get(Getmedicine(1),(rs)=>{
        $.get(Getmedicine(2),(r)=>{
          this.setState({
            situatio: rss,
            medicine: rs.results,
            medicineH: r.results,
          })
        })
      })
    })
  }

  componentDidMount(){
    document.getElementById("flatpickr_tryme_s").flatpickr();
    document.getElementById("flatpickr_tryme_e").flatpickr();
  }


  componentDidUpdate(){
    if(this.state.fist){
      $(".searchable-select:eq(0)").css('z-index','20')
      this.setState({
        ...this.state,
        fist:false,
      })
    }
  }

  del(id,i){
    if (!confirm('确认删除？')){
      return ;
    }
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(DelUserSituation(id,user.authToken),(rs)=>{
      if(rs.isDelete){
        let medicationUsingSituations = this.state.situatio.medicationUsingSituations;
        let a = medicationUsingSituations.findIndex((e,i,a)=>{ return e.id==id})
        this.state.situatio.medicationUsingSituations.splice(a,1);
        this.setState({
          ...this.state,
        })
      }
    })
  }

  check(type,value,id){
    if(type=='mid'){
      $.get(GetmedicineHuaXueByName(value),(r)=>{
        this.refs.midH.overName(r.results);
      })
      this.refs.medicineName.value=value;
      this.refs.medicineID.value=id;
    }else{
      $.get(GetmedicineByName(value),(r)=>{
        this.refs.mid.overName(r.results);
      })
    }
  }
  clear() {
   this.refs.mid.clear();
   this.refs.midH.clear();
    $("#flatpickr_tryme_s").val('');
    $("#flatpickr_tryme_e").val('');
    $("#ssml").val('');
  }
  onChange(event){
    event.target.value = event.target.value.replace(/[^\d.]/g,'');
  };
  render(){
    let ti=[];
    for(let i=1;i<=10;i++){
      ti.push(<option key={i}>{i}次</option>)
    }

    let dur;
    if(this.state.situatio.medicationUsingSituations!=undefined){
      dur = this.state.situatio.medicationUsingSituations.map((o,i)=>(
        <tr key={i}>
          <td>{o.startTime}</td>
          <td>{o.endTime}</td>
          <td>{o.medicineName}</td>
          <td>{o.frequencyUnit} {o.usingFrequency}(单次 {o.singleDose}{o.medicineUnit})</td>
          <td style={{cursor:"pointer"}} onClick={()=>this.del(o.id,i)}>删除</td>
        </tr>
      ))
    }

    let mName=null;
    let mNameH=null;
    if(this.state.medicine!=''){
      mName = <SelectInput ref="mid" data={this.state.medicine} type="mid" check={(type,value,id)=>this.check(type,value,id)}/>
      mNameH =  <SelectInput ref="midH" data={this.state.medicineH} type="midH" check={(type,id)=>this.check(type,id)}/>
    }
    let startTime,endTime,medicineName,frequencyUnit,singleDose,medicineUnit,usingFrequency,historyOfAllergy,drugAddiction,medicineID;
    medicineName = this.refs.medicineName;
    medicineID = this.refs.medicineID;
    return(
      <div className={PersonalStyle.infoContent}>
        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;药物情况</h3>
        <table className="table" style={{margin:'40px 0'}}>
          <tbody>
          <tr className='active'>
            <td>开始服药日期</td>
            <td>结束服药日期</td>
            <td>药物名称</td>
            <td>用药频度</td>
            <td>操作</td>
          </tr>
          {dur}
          </tbody>
        </table>

        <h3 style={{borderLeft:'4px solid #000066'}}>&nbsp;添加药物情况</h3>

        <input type="hidden" ref="medicineName"/>
        <input type="hidden" ref="medicineID"/>

        <form onSubmit={e=>{
          e.preventDefault();
          if(startTime.value==''||endTime.value==''||medicineName.value==''||medicineID.value==''||frequencyUnit.value==''||singleDose.value==''||medicineUnit.value==''||usingFrequency.value==''){
            alert('请输入完整信息')
            return false;
          }

          if(startTime.value > endTime.value){
            alert('开始时间不能大于结束时间')
            return false
          }

          if(postJson.medicationUsingSituations != null) {
             postJson.medicationUsingSituations.push({
              startTime:startTime.value,
              endTime:endTime.value,
              medicineName:medicineName.value,
              medicineId:medicineID.value,
              frequencyUnit:frequencyUnit.value,
              singleDose:singleDose.value,
              medicineUnit:medicineUnit.value,
              usingFrequency:usingFrequency.value,
            })
          } else {
            postJson.medicationUsingSituations=[{
              startTime:startTime.value,
              endTime:endTime.value,
              medicineName:medicineName.value,
              medicineId:medicineID.value,
              frequencyUnit:frequencyUnit.value,
              singleDose:singleDose.value,
              medicineUnit:medicineUnit.value,
              usingFrequency:usingFrequency.value,
            }]
          }


          if(historyOfAllergy.value!=''){
            postJson.historyOfAllergy=historyOfAllergy.value;
          }
          if(drugAddiction.value!=''){
            postJson.drugAddiction=drugAddiction.value;
          }

          let user = sessionStorage.getItem('userData');
          user = JSON.parse(user);


          $.post(PostUserSituation(user.authToken),JSON.stringify(postJson),(rs,code)=>{
            if(code='success'){
              alert('修改成功')
              $.get(GETUserSituation(user.authToken),(rs)=>{
                postJson = rs;
                this.setState({
                  ...this.state,
                  situatio: rs
                })
                this.clear();
              })
            }
          })

        }}>
        <div className={PersonalStyle.inputGroup}>
          <div>开始服药日期 : </div>
          <input id="flatpickr_tryme_s" name="flatpickr_tryme_s" ref={node=>{startTime=node}}/>
          <span>*请选择日期</span>
        </div>
        <div className={PersonalStyle.inputGroup}>
          <div>结束服药日期 : </div>
          <input id="flatpickr_tryme_e" name="flatpickr_tryme_e" ref={node=>{endTime=node}}/>
          <span>*请选择日期</span>
        </div>
        <div className={PersonalStyle.inputGroup}>
          <div>药物名称 : </div>
          {mName}
          <span>*请选择用药名称</span>
        </div>
        <div className={PersonalStyle.inputGroup}>
          <div>化学名称 : </div>
          {mNameH}
          <span>*请选择用药名称</span>
        </div>
        <div className={PersonalStyle.inputGroup}>
          <div>用药频度 : </div>
          <select style={{width:'100px'}} ref={node=>{frequencyUnit=node}}>
            <option value="每小时">每小时</option>
            <option value="每天">每天</option>
            <option value="每周">每周</option>
            <option value="每月">每月</option>
            <option value="每年">每年</option>
          </select>
          <select style={{width:'100px'}} ref={node=>{usingFrequency=node}}>
            {ti}
          </select>
          <input maxLength="5" placeholder="单次用药量" style={{width:'100px'}} id="ssml" onChange={node=>this.onChange(node)}  ref={node=>{singleDose=node}}/>
          <select style={{width:'65px'}} ref={node=>medicineUnit=node}>
            <option value="g">g</option>
            <option value="mg">mg</option>
            <option value="ug">ug</option>
            <option value="ml">ml</option>
            <option value="u">u</option>
            <option value="iu">iu</option>
          </select>
          <span>*请输入用量信息</span>
        </div>

        <div className={PersonalStyle.inputGroup}>
          <div>&nbsp;</div>
          <span> <button className={PersonalStyle.btnActive} type="button" onClick={()=>this.clear()}>清空药物</button></span>
        </div>

        <div className={PersonalStyle.inputGroup}>
          <div>过敏史:</div>
          <textarea  maxLength="100" placeholder={this.state.situatio.drugAddiction==''?'暂无':this.state.situatio.drugAddiction} ref={node=>{drugAddiction=node}}></textarea>
          <br/>
        </div>
        <div className={PersonalStyle.inputGroup}>
          <div>成瘾药物 : </div>
          <textarea maxLength="100" placeholder={this.state.situatio.historyOfAllergy==''?'暂无':this.state.situatio.historyOfAllergy}  ref={node=>{historyOfAllergy=node}}></textarea>
          <br/>
        </div>

        <div className={PersonalStyle.btnGroup}>
          <button className={PersonalStyle.btnActive} ref="changeSave">修改</button>
        </div>
        </form>

      </div>
    )
  }
}
export default UserDrugSituation;
