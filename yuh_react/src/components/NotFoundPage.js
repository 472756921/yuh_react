/**
 * Created by Benson on 2017/4/20.
 */
import React from 'react';
import {hashHistory} from 'react-router';

class NotFoundPage extends React.Component{
  render(){
    return (
      <div>
        <img src={require('images/banner/404.png')} className="center-block"  onClick={()=>{hashHistory.push({pathname:'/'})}}/>
      </div>
    )
  }
}

export default NotFoundPage;
