import React from 'react';
import FooterStyle from '../styles/footer.css'

class Footer extends React.Component {

  render() {
    return (
        <footer>
          <div className={FooterStyle.footer_A}>
            <div className={FooterStyle.footer_A_content}>
              <div className={FooterStyle.footer_A_text_content}>
                <h3 className={FooterStyle.footer_title}>关于我们</h3>
                <small style={{color: '#eee'}}>about us</small>
                <div className={FooterStyle.footer_A_list}><a href="#/Introduction" style={{color: '#ffffff'}}>公司简介</a></div>
              </div>
              <div className={FooterStyle.footer_A_text_content}>
                <h3 className={FooterStyle.footer_title}>客服热线</h3>
                <small style={{color: '#eee'}}>customer service</small>
                <div className={FooterStyle.footer_A_list} style={{fontSize: '20px'}}>400-080-8820</div>
                <div className={FooterStyle.footer_A_list} style={{marginTop:'12px'}}>周一至周五（8:30 ~ 18:00）</div>
                <div className={FooterStyle.footer_A_list}>周六至周日（9:30 ~ 18:00）</div>
              </div>
              <div  className={[FooterStyle.footer_A_text_content,FooterStyle.cen].join(" ")}>
                <h3 className={FooterStyle.footer_title}>微信关注</h3>
                <small style={{color: '#eee'}}>wechat</small>
                <div  className={FooterStyle.footer_A_list}>
                  <img src={require('images/icon/wechat_1.png')}/>
                </div>
              </div>
              <div  className={[FooterStyle.footer_A_text_content,FooterStyle.cen].join(" ")}>
                <h3 className={FooterStyle.footer_title}>优医用户下载</h3>
                <small style={{color: '#eee'}}>user app</small>
                <div  className={FooterStyle.footer_A_list}>
                  <img src={require('images/icon/wechat_1.png')}/>
                </div>
              </div>
              <div className={[FooterStyle.footer_A_text_content,FooterStyle.cen].join(" ")}>
                <h3 className={FooterStyle.footer_title}>优医医生下载</h3>
                <small style={{color: '#eee'}}>doctor app</small>
                <div  className={FooterStyle.footer_A_list}>
                  <img src={require('images/icon/wechat_1.png')}/>
                </div>
              </div>
            </div>
          </div>
          <div className={FooterStyle.footer_B}>
            <div className={FooterStyle.footer_B_content}>
              深圳优医汇技术有限公司 版权所有 Copyright &copy; 2015-2017 All Rights Reserved  <span style={{cursor:'pointer'}} onClick={()=>{window.open('http://www.miitbeian.gov.cn')}}>粤ICP备15062279号</span> XXX工商局
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
