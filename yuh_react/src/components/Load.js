/**
 * Created by Benson on 2017/4/12.
 */
import LoadStyle from '../styles/Load.css';
import React from 'react';

const Load = ()=>(
  <div className={LoadStyle.loadContent}>
    <div className={LoadStyle.fugai}></div>
    <div className={LoadStyle.spinner}>
      <div className={[LoadStyle.spinner_container,LoadStyle.container1].join(' ')}>
        <div className={LoadStyle.circle1}></div>
        <div className={LoadStyle.circle2}></div>
        <div className={LoadStyle.circle3}></div>
        <div className={LoadStyle.circle4}></div>
      </div>
      <div className={[LoadStyle.spinner_container,LoadStyle.container2].join(' ')}>
        <div className={LoadStyle.circle1}></div>
        <div className={LoadStyle.circle2}></div>
        <div className={LoadStyle.circle3}></div>
        <div className={LoadStyle.circle4}></div>
      </div>
      <div className={[LoadStyle.spinner_container,LoadStyle.container3].join(' ')}>
        <div className={LoadStyle.circle1}></div>
        <div className={LoadStyle.circle2}></div>
        <div className={LoadStyle.circle3}></div>
        <div className={LoadStyle.circle4}></div>
      </div>
    </div>
  </div>
)
export default Load;
