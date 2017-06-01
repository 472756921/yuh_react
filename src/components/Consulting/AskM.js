/**
 * Created by Benson on 2017/4/12.
 */
import React from 'react';
import AskMStyle from '../../styles/AskM.css';
import ImgUpLoad from './ImgUpLoad';
import AskDatile from './AskDatile';
import {ASKTIME,ASKMPost} from '../../InterFace/InterfaceAPI';

class AskM extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ASKMTIME: ''
    }
  }
  componentWillMount() {
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
      $.get(ASKTIME(user.authToken),(rs)=>{
        this.setState({
          ASKMTIME: rs.healthAdvisory
        })
      })
  }

  postAdv(){
    let content = this.refs.content.value;

    if(content==''){
      this.refs.tishi.innerHTML='请输入提问内容';
      return
    }
    if(content.length > 250){
      this.refs.tishi.innerHTML='提问长度不能超过250个字符';
      return
    }
    if(this.state.ASKMTIME==0){
      this.refs.tishi.innerHTML='对不起您本月咨询次数已经用尽';
      return
    }
    let json = {content:content}
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.post(ASKMPost(user.authToken),JSON.stringify(json),(rs)=>{
      this.refs.AskDatile.updata();
      this.refs.tishi.innerHTML='提交成功';
      this.setState({
        ASKMTIME: this.state.ASKMTIME-1
      })
    })
    this.refs.content.value = '';
  }

  render(){
    return(
      <div className={AskMStyle.content}>
        <h3 className={AskMStyle.title}>
          <span className={AskMStyle.line}></span>
          问健管师
          <small style={{color:'red'}}>&nbsp; 免费咨询次数剩余{this.state.ASKMTIME}次</small>
        </h3>

        <div className={AskMStyle.content_}>
          <div ref="tishi"></div>
          <h4 className={AskMStyle.title_}><img src={require('images/ICON/edit.png')} height="22" style={{verticalAlign:'bottom'}}/> 立即提问</h4>
          <div className={AskMStyle.context}>
            <textarea maxLength="250" className={AskMStyle.textareas} rows="5" placeholder="描述病情，主要的身体不适或症状或表现" ref="content"></textarea>
          </div>
          <button className={[AskMStyle.btn,'center-block'].join(' ')} onClick={()=>this.postAdv()}>提交问题</button>
        </div>

        <AskDatile title="ASKM" ref="AskDatile"/>

        <div className={AskMStyle.clear}></div>

      </div>
      )
  }
}

export default AskM;
