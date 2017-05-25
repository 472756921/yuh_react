/**
 * Created by Benson on 2017/4/25.
 */
import React from 'react';
import AppHead from '../Head/HeadMain';
import {hashHistory} from 'react-router';
import PayStyle from '../../styles/Pay.css';


class Pay extends React.Component{
  constructor(props) {
    super(props);
    let index = this.props.location.state.index;
  };

  render(){
    return (
      <div>
        <AppHead type="TOP"/>
        <div style={{background:'#f5f5f5',overflow:'auto'}}>
          <div className={PayStyle.content}>
            <h4>项目：</h4>
            <div className={PayStyle.buyList}> <input type="checkbox"/> {this.props.location.state.index}</div>
            <div className={PayStyle.line}></div>
            <h4>支付方式：</h4>
            <div className={PayStyle.payList}>
              <input type="radio" name="pay"/>
              <img src={require('images/ICON/zfb.jpg')}/>
            </div>
            <div className={PayStyle.payList}>
              <input type="radio" name="pay"/>
              <img src={require('images/ICON/wePay.png')}/>
            </div>
            <div>
              <div style={{textAlign:'right'}}>
                <span>合计：</span>
                <span style={{color:'red',fontSize:'20px'}}>￥1000.00</span>
                <br/>
                <button className={PayStyle.btn}>立即购买</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Pay;
