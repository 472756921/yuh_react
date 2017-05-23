/**
 * Created by Benson on 2017/3/30.
 */
import React from 'react';
import {hashHistory} from 'react-router';
import HomeStyle from '../../styles/home.css';

class Home_B extends React.Component {
  tiwen(type){
    if(type==1){
      hashHistory.push({pathname:'/ConsultingMain/HMD'})
    }else{
      hashHistory.push({pathname:'/ConsultingMain/HMDUC'})
    }
  }
  render() {
    return (
      <div className={HomeStyle.index_B}>
        <div className={HomeStyle.index_B_content}>
          <div className={HomeStyle.list}>
            <img src={require('images/index/5.png')} alt="问健管师" />
            <div className={HomeStyle.intro}>
              <h3 className={HomeStyle.index_B_content_title}>问健管师</h3>
              <small className={HomeStyle.health_management_title_small}>health management divisio</small>
              <p className={HomeStyle.index_B_content_text}>问健管师是由优医推出的一个在线询问健康管理师疾病小知识的咨询平台，是为
                了服务于中老年人群，帮助中老年慢病患者及时自查自身身体状况，解决日常生
                活中出现的小问题。优医的愿景是打造专业的慢病管理服务体系，降低各类心血
                管事件的发生率，提高高血压与糖尿病人群的健康管理水平。</p>
              <button className={HomeStyle.index_btn} onClick={()=>this.tiwen(1)}>立即提问</button>

            </div>
          </div>
          <div className={HomeStyle.list}>
            <img src={require('images/index/6.png')} alt="问医生" className='pull-right'/>
            <div className={HomeStyle.intro}>
              <h3 className={HomeStyle.index_B_content_title}>问医生</h3>
              <small className={HomeStyle.health_management_title_small}>referring physician</small>
              <p className={HomeStyle.index_B_content_text}>问医生是由优医推出的一个在线询问医生疾病的咨询平台，是为了服务于中老年人群，
                帮助中老年慢病患者在线询问自身病理，管理自身健康状况。
                优医的愿景是打造专业的慢病管理服务体系，降低各类心血管事件的发生率，提高高血压与糖尿病人群的健康管理水平。
              </p>
              <button className={HomeStyle.index_btn}  onClick={()=>this.tiwen(2)}>立即提问</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home_B;
