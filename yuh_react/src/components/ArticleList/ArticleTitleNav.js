/**
 * Created by Benson on 2017/4/1.
 */
import React from 'react';
import {hashHistory} from 'react-router';
import ArticleTitleNavStyle from '../../styles/ArticleTitleNav.css';

class ArticleTitleNav extends React.Component{
  render(){
    return (
      <h5 className={ArticleTitleNavStyle.title}>
        <span onClick={()=>{hashHistory.push({pathname:'/'})}}><span className="glyphicon glyphicon-home"></span> 首页</span>
        <span className={ArticleTitleNavStyle.left_arr}> > </span>
        <span>{this.props.type}</span>
        <span className={ArticleTitleNavStyle.left_arr}> > </span>
        <span>详情</span>
      </h5>
    )
  }
}

export default ArticleTitleNav;
