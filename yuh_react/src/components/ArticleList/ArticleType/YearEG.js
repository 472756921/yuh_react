/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import YearJiStyle from '../../../styles/reportYear.css';
import {majordignosereportDatil} from '../../../InterFace/InterfaceAPI';

let userName;
class MonJi extends React.Component{
  render(){
     let img =  require('images/report/eg.png');
    return(
      <div>
        <img src={img} />
      </div>
    )
  }
}
export default MonJi;
