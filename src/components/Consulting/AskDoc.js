/**
 * Created by Benson on 2017/4/12.
 */
import React from 'react';
import AskMStyle from '../../styles/AskM.css';
import ImgUpLoad from './ImgUpLoad';
import AskDatile from './AskDatile';
import {ASKDOCGetGroup,ASKTIME,ASKDOCPost} from '../../InterFace/InterfaceAPI';

class AskM extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:'',
      ASKTIMEDOCTIME: ''
    }
  }
  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(ASKDOCGetGroup(user.authToken),function(rs){
      this.setState({
        data: rs[0],
      })
    }.bind(this))
    $.get(ASKTIME(user.authToken),(rs)=>{
      this.setState({
        ...this.state,
        ASKTIMEDOCTIME: rs.doctorAdvisory
      })
    })
  };

  ASKDOCPosts(){
    //if(this.state.ASKTIMEDOCTIME==0){
    //  this.refs.tishi.innerHTML='对不起您本月咨询次数已经用尽';
    //  return;
    //}
    if(this.refs.desc.value==''||this.refs.help.value==''){
      this.refs.tishi.innerHTML='请输入个人既往病史、请输入希望医生提供的帮助';
      return
    }
    let infoA =  this.refs.imagA.getData();
    let infoB =  this.refs.imagB.getData();
    let Json = {
      medicalPics:infoB.img,
      checkItems:infoA.img,
      desc: this.refs.desc.value,
      help: this.refs.help.value,
      medicalTxt: infoB.medicalTxt,
      groupId:this.state.data.id
    }
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.post(ASKDOCPost(user.authToken),JSON.stringify(Json),()=>{
      this.refs.tishi.innerHTML='提交成功';
      this.refs.AskDatile.updata();
      this.setState({
        ASKMTIME: this.state.ASKMTIME-1
      })
      this.refs.desc.value='';
      this.refs.help.value='';
      this.refs.imagB.clear();
      this.refs.imagA.clear();
    })
  };

  render(){
    return(
      <div className={AskMStyle.content}>
        <h3 className={AskMStyle.title}>
          <span className={AskMStyle.line}></span>
          问医生
          <small style={{color:'red'}}>&nbsp; 免费咨询次数剩余{this.state.ASKTIMEDOCTIME}次</small>
        </h3>
        <div className={AskMStyle.content_}>
          <div ref="tishi"></div>
          <h4 className={AskMStyle.title_}><img src={require('images/ICON/edit.png')} height="22" style={{verticalAlign:'bottom'}}/> 立即提问</h4>
          <div className={AskMStyle.context}>
            <p style={{wordWrap:'break-word',overflow:'auto',lineHeight:'24px',marginTop:'10px'}}>
              <img src={this.state.data.logo} className="pull-left" height="85" style={{marginRight:'4px',border:'1px solid #e3e3e3'}}/>
              <h4>{this.state.data.name}</h4>
              {this.state.data.detail}
            </p>
            <div><span style={{color:'red'}}>*</span> 病情简述：</div>
            <textarea className={AskMStyle.textareas} rows="5" placeholder="描述病情，主要的身体不适或症状或表现" ref="desc"></textarea>
            <ImgUpLoad  title="上传已做的检查项目"  ref="imagA" />
            <ImgUpLoad  title="上传药文本或图片" ref="imagB" />
            <div><span style={{color:'red'}}>*</span> 希望医生提供的帮助：</div>
            <textarea className={AskMStyle.textareas} rows="3" ref="help"></textarea>
          </div>
          <button className={[AskMStyle.btn,'center-block'].join(' ')} onClick={()=>this.ASKDOCPosts()}>提交问题</button>
        </div>

        <AskDatile  title="ASKDOC" ref="AskDatile"/>

        <div className={AskMStyle.clear}></div>
      </div>
    )
  }
}

export default AskM;
