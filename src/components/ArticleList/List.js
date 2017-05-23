/**
 * Created by Benson on 2017/3/31.
 */
import React from 'react';
import HomeStyle from '../../styles/home.css';
import {Link} from 'react-router';
const List = ({title,lastUpdateTime,type,id})=>(
  <li>
    <Link to={{ pathname: '/Article/'+type+'/'+id}}>{title}</Link>
    <span className={HomeStyle.date}>{lastUpdateTime.split(" ")[0]}</span>
  </li>
)

export default List;
