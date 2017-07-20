import React from 'react';
import AsideStyle from '../styles/Aside.css';

class Aside extends React.Component {
  render() {
    return (
        <aside>
          <div className={AsideStyle.aside_bk}></div>
          <div className={AsideStyle.aside_content}>
            <div className={AsideStyle.aside_btn}>
              <img src={require('images/icon/phone_white.png')} alt="下载优医APP"/>
              <div className={[AsideStyle.aside_left_content,AsideStyle.wechar].join(" ")}>
                <h4>优医-用户版</h4>
                <img src={require('images/icon/userAPP.png')} width="100"/>
                <div className={AsideStyle.striping}></div>
                <h4>优医-医生版</h4>
                <img src={require('images/icon/doctorApp.png')} width="100"/>
              </div>
            </div>
            <div className={AsideStyle.aside_btn}>
              <img src={require('images/icon/wechat_white.png')} alt="下载优医APP"/>
              <div className={[AsideStyle.aside_left_content,AsideStyle.wechar].join(" ")}>
                <h4>微信关注</h4>
                <img src={require('images/icon/wechat_1.png')}/>
              </div>
            </div>
            <div className={AsideStyle.aside_btn}>
              <a onClick={()=>{document.getElementById('top').scrollIntoView()}}>
                <div className={AsideStyle.aside_triangle_up}></div>
                <span style={{color:'#fff'}}>TOP</span>
              </a>
            </div>
          </div>
        </aside>
    );
  }
}

export default Aside;
