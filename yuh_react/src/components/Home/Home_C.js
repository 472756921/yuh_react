/**
 * Created by Benson on 2017/3/31.
 */

import React from 'react';
import HomeStyle from '../../styles/home.css';
import Lists from '../ArticleList/Lists';
import {Link} from 'react-router';

const Home_C = ()=>{
  return(
    <div className={HomeStyle.index_C}>
      <img src={require('images/index/health-ask.png')} alt="健康管理"/>
      <div className={HomeStyle.index_C_text}>
        <div className={HomeStyle.article}>
          <h3 className={HomeStyle.index_C_text_title}>最新文章
            <small className={HomeStyle.more}>
              <Link to={{ pathname: '/Articles/newArticle'}}>更多</Link>
              <img src={require('images/ICON/arrow.png')} style={{marginLeft: '8px',verticalAlign: 'sub'}} />
            </small>
          </h3>
          <Lists position="index" type="newArticle" />
        </div>

        <div className={[HomeStyle.article,'pull-right'].join(" ")}>
          <h3 className={HomeStyle.index_C_text_title}>主治医师观点
            <small className={HomeStyle.more}>
              <Link to={{ pathname: '/Articles/doctorSuggest'}}>更多</Link>
              <img src={require('images/ICON/arrow.png')} style={{marginLeft: '8px',verticalAlign: 'sub'}}/>
            </small>
          </h3>
          <Lists position="index" type="doctorSuggest" />
        </div>
      </div>
    </div>
  )
}

export default Home_C;
