/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import AppHead from '../Head/HeadMain';
import { hashHistory } from 'react-router';
import PersonalStyle from '../../styles/Personal.css';
import Menu from './UserMenu';

class PersonalMain extends React.Component{
  componentDidMount(){
    document.getElementById('top').scrollIntoView()
  }
  noRead(type){
    this.refs.menu.changeNum(type);
  }

  render(){
    return(
      <div>
        <AppHead type="TOP" img={hashHistory.getCurrentLocation().pathname.split('/')[2]} />
        <div style={{background:"#f5f5f5",overflow:'auto'}}>
          <div className={PersonalStyle.content}>
            <Menu ref="menu"/>
            {this.props.children && React.cloneElement(this.props.children, {
              noRead: (type)=>this.noRead(type)
            })}
            <div className={PersonalStyle.clear}></div>
          </div>
        </div>
      </div>
      )
  }
}

export default PersonalMain;
