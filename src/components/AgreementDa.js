/**
 * Created by Benson on 2017/4/24.
 */
import React from 'react';
import LoginStyle from '../styles/Login.css';
import RegisteredStyle from '../styles/registered.css';
import {hashHistory} from 'react-router';
import {protocol} from '../InterFace/InterfaceAPI';

class Agreements extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      text:''
    }
  };
  componentWillMount(){
    $.get(protocol(),(rs)=>{
      this.setState({
        text:rs.content
      })
    })
  }
  createMarkup() { return {__html: this.state.text}; };

  render(){
    return (
      <div className={LoginStyle.content}>
        <div className={LoginStyle.top}>
          <img src={require('images/icon/logo.png')} onClick={()=>{hashHistory.push({pathname:'/'})}} />
        </div>
        <div className={LoginStyle.res} style={{paddingTop:'30px'}}>
          <h2 className={RegisteredStyle.title}>用户注册协议</h2>
          <div className={RegisteredStyle.text}  dangerouslySetInnerHTML={this.createMarkup()}></div>
          <div className={RegisteredStyle.btnGrup}>
            <button onClick={()=>{hashHistory.push({pathname:'register'})}}>同意</button>
            <button onClick={()=>{hashHistory.push({pathname:'/'})}}>返回</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Agreements;
